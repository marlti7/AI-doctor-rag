import { chromium } from "playwright";
export const crawlWebFn = async (url) => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        // await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        // await page.waitForSelector('#richTextContainer', { timeout: 10000 })
        // const content = await page.$eval('#richTextContainer', (el) => el.textContent.trim())
        // console.log('爬取网页成功:', content);
        // return content
        // 1. 打开网页
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 20000,
        });
        // 2. 给动态内容一点加载时间
        await page.waitForTimeout(1000);
        // 3. 获取网页标题
        const title = await page.title();
        // 4. 删除明显不是正文的内容
        await page.evaluate(() => {
            const selectors = [
                'script',
                'style',
                'noscript',
                'iframe',
                'svg',
                // 页面结构
                'nav',
                'header',
                'footer',
                // 常见广告
                '.ad',
                '.ads',
                '.advertisement',
                '[class*="advert"]',
                '[id*="advert"]',
                // 弹窗
                '.popup',
                '.modal',
                '[class*="popup"]',
                '[class*="modal"]',
                // Cookie
                '[class*="cookie"]',
                '[id*="cookie"]',
            ];
            selectors.forEach(selector => {
                document
                    .querySelectorAll(selector)
                    .forEach(el => el.remove());
            });
        });
        // 5. 尝试寻找正文
        const content = await page.evaluate(() => {
            // 按优先级寻找正文
            const selectors = [
                'article',
                'main',
                '[role="main"]',
                // 常见文章正文 class
                '.article-content',
                '.article-body',
                '.article',
                '.post-content',
                '.post-body',
                '.entry-content',
                '.content',
                '.main-content',
                // 常见中文网站正文
                '.rich_media_content',
                '.rich-text',
                '.detail-content',
                '.detail',
                '.news-content',
                '.news-detail',
                '.text-content',
            ];
            for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (!element) {
                    continue;
                }
                const text = element.innerText?.trim();
                // 太短的内容大概率不是正文
                if (text && text.length >= 300) {
                    return text;
                }
            }
            // 6. 如果没有找到明确的正文区域
            // 就退化到 body
            return document.body?.innerText || '';
        });
        // 7. 清洗文本
        const cleanContent = content
            .replace(/\r/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[ \t]{2,}/g, ' ')
            .trim();
        console.log('爬取网页成功:', {
            url,
            title,
            contentLength: cleanContent.length,
        });
        return {
            url,
            title,
            content: cleanContent,
        };
    }
    catch (error) {
        // console.error('crawlWebFn 失败:', error);
        // throw error;
        return error;
    }
    finally {
        await browser.close();
    }
};
