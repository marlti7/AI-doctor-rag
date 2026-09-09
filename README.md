# 🧑‍⚕️ Ai智能医生聊天助手
这是一个前端基于Vue3、TS、后端基于Nest.js、MongoDB、Redis、Milvus并结合大模型、RAG等技术实现的医疗库智能问答系统，能结合大模型的生成能力和上传的专业医疗领域知识库针对提问给出专业回答。同时具备工具调用能力，可使用MCP集成网页爬取能力让大模型根据网址对应的医疗领域文章进行分析和输出。



## ✨ 主要功能

### 🔐 登陆注册

- 保留和区分每个账号的对话记录
- 可注册/登陆/退出账号

[登陆注册](
<img width="1419" height="776" alt="截屏2026-09-09 15 50 42" src="https://github.com/user-attachments/assets/1fd37943-4d4f-4441-98a2-d192366d244b" />

)



### 💬 流式输出回答

- 使用流式输出形式回复问题
- MD格式展示
- 回复附带严谨提示（仅供参考，具体应遵医嘱）

![流式输出](https://github.com/Jevon-Zhong/AI-doctor-rag/blob/main/images/%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.gif?raw=true)



### 📚 知识库管理

- 上传/删除知识库中的文件（pdf/docx）

[知识库管理](
<img width="1419" height="775" alt="截屏2026-09-09 19 22 23" src="https://github.com/user-attachments/assets/9f0df26f-9a55-4fa3-ab7e-0b6251d85058" />

)




### 💡 基于知识库内容回答

- 点击知识库问答按钮可基于上传知识库文件相关内容进行分析回复
- 检索知识库中相关内容，显示具体检索到的文章列表

[知识库问答](
<img width="1403" height="780" alt="截屏2026-09-09 19 25 17" src="https://github.com/user-attachments/assets/be96e814-16b9-4886-8e1f-94248f591207" />



)



### 🗂️ 基于上传的文档回答

- 用户可上传pdf/docx文档，然后提问，大模型会结合问题与文档内容进行总结输出

![上传文档问答](https://github.com/Jevon-Zhong/AI-doctor-rag/blob/main/images/%E4%B8%8A%E4%BC%A0%E6%96%87%E6%A1%A3%E9%97%AE%E7%AD%94.png?raw=true)



### 🩻 基于上传的图片回答

- 用户可上传图片，然后提问，大模型会使用多模态能力结合问题与图片内容进行总结输出

![上传图片问答](https://github.com/Jevon-Zhong/AI-doctor-rag/blob/main/images/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87%E9%97%AE%E7%AD%94.png?raw=true)



### 🔨 MCP工具调用

- 可选择工具列表中的工具来进行特殊功能操作（如图例的爬取网页内容操作）

![MCP工具调用](https://github.com/Jevon-Zhong/AI-doctor-rag/blob/main/images/MCP%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8.png?raw=true)



## 🛠️ 技术架构

- **前端**：Vue3 + Ts + Pinia + Element plus
- **后端**：NestJs + Ts
- **MCP服务端**：Express
- **数据库**：Milvus + Redis + Mongo
- **大模型**：通义千问系列



## 🕹️ 运行环境

- **Node.Js**：v20.18.0
- **milvusdb/milvus**：v2.6.1
- **redis**：8.0
- **mongo**：8.0.9



## 🚀 项目运行

### 目录介绍

- **project-user**：项目前端
- **nest-server**：项目后端
- **project-mcp-server**：mcp服务器
- **mcp-client-demo**：mcp客户端demo（仅用于测试mcp服务器连接）



### 安装数据库

- 下载docker https://docs.docker.com/get-started/get-docker/
- 安装Milvus 具体安装文档参考 https://milvus.io/docs/zh/prerequisite-docker.md 
- 安装 mongodb 
- 安装 redis



### 运行项目

1. **克隆项目**

   ```bash
   git clone git@github.com:marlti7/AI-doctor-rag-rag.git
   cd AI-doctor-rag
   ```

2.  **运行project-mcp-server**


   ```bash
   cd project-mcp-server
   npm i
   npm run start
   ```

3. **运行nest-server**

    在项目根目录创建.env文件，然后粘贴以下内容

   ```bash
   # 数据库地址
   MONGODB_URI=mongodb://user:user123@127.0.0.1:27017/ai_doctor?authSource=admin
   
   # 对登陆密码加密密钥
   PASSWORD_KEY=abcdefg
   
   # jwt密钥
   JWT_SECRET=aidoctor123
   
   # 向量数据库
   MILVUS_ADDRESS=127.0.0.1:19530
   
   #通义千问apikey，大模型和url 填写自己申请的
   QWEN_API_KEY=sk-xxx
   QWEN_MODEL=qwen-turbo
   QWEN_API_BASE_URL=https://ws-juo5nzf4x48p5xco.cn-beijing.maas.aliyuncs.com/compatible-mode/v1
   
   #redis地址
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   
   #ip地址
   IP_ADDR=http://127.0.0.1:3000
   ```

   ```bash
   cd nest-server
   npm i
   npm run start
   ```

4. **运行project-user**

   ```bash
   cd project-user
   npm i
   npm run dev
   ```












