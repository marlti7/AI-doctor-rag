import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { ChatCompletionTool } from 'openai/resources/chat/completions'
export class MCPClient {
    private client: Client
    private mcpServerURL: URL
    //   private anthropic: Anthropic;
    private transport: StreamableHTTPClientTransport | null = null
    private tools: ChatCompletionTool[] = []
    private sessionId?: string

    constructor(mcpServerURL: string) {
        // this.anthropic = new Anthropic({
        //   apiKey: ANTHROPIC_API_KEY,
        // });
        this.client = new Client({ name: "mcp-client-cli", version: "1.0.0" })
        this.mcpServerURL = new URL(mcpServerURL)
    }
    // methods will go here
    connectToServer = async () => {
        try {
            this.transport = new StreamableHTTPClientTransport(this.mcpServerURL)
            console.log('没连接前的sessionID', this.sessionId)
            await this.client.connect(this.transport)

            // 连接成功后，从 transport 中获取服务端生成的 sessionId
            this.sessionId = this.transport.sessionId;
            console.log('服务端生成的 sessionId:', this.sessionId);
            console.log('Connected using Streamable HTTP transport');
            //获取的工具列表
            const toolsResult = await this.client.listTools();
            //遍历列表，组装成大模型需要的工具格式
            this.tools = toolsResult.tools.map((tool) => ({
                "type": "function",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.inputSchema,
                },
            }));
            console.log(
                "Connected to server with tools:",
                JSON.stringify(this.tools)
            );
        } catch (error) {
            console.error("连接失败:", error);
        }

    }
    getTools = () => {
        return this.tools
    }
    callTool = async (toolName: string, toolCallArgsStr: string) => {
        // if (!this.sessionId) {
        //     throw new Error("未连接到服务端，请先调用 connectToServer()");
        // }
        let args: any
        try {
            args = JSON.parse(toolCallArgsStr)
        } catch (err) {
            // JSON 解析失败：尝试从可能的拼接 JSON 字符串中提取独立对象并解析
            console.warn('callTool: 原始参数无法解析为 JSON，尝试从拼接内容中恢复。 raw:', toolCallArgsStr)
            const matches = toolCallArgsStr.match(/\{[^}]*\}/gs) || []
            const parsedList: any[] = []
            for (const m of matches) {
                try {
                    parsedList.push(JSON.parse(m))
                } catch (e) {
                    // 忽略单个片段的解析错误
                    continue
                }
            }
            if (parsedList.length === 1) {
                args = parsedList[0]
            } else if (parsedList.length > 1) {
                // 优先选择包含 clarified_question 的对象，否则合并所有对象字段
                const found = parsedList.find(p => p && typeof p === 'object' && 'clarified_question' in p)
                if (found) args = found
                else args = Object.assign({}, ...parsedList)
            } else {
                // 回退：尝试通过正则直接提取 clarified_question 字符串
                const m2 = toolCallArgsStr.match(/"clarified_question"\s*:\s*"([\s\S]*?)"/)
                if (m2) {
                    args = { clarified_question: m2[1] }
                } else {
                    // 无法恢复有效参数，抛出错误以便上层处理
                    throw new SyntaxError('无法解析工具调用参数: ' + toolCallArgsStr)
                }
            }
        }

        const result = await this.client.callTool({
            name: toolName,
            arguments: args,
        })
        console.log('调用工具的结果', result, toolName, args)
        return result
    }
    // 获取当前 sessionId 的方法
    getSessionId = (): string | undefined => {
        return this.sessionId;
    };
}




