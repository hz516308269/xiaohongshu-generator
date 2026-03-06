export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 从环境变量获取API Key
    const apiKey = process.env.ZHIPU_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { type, productName, sellingPoint, painPoint, length } = req.body;

        const wordCount = length === 'short' ? '250-350字' : '450-600字';
        
        const prompt = `你是一个小红书爆款文案专家。请帮我写一篇小红书文案。

【要求】
1. 文案类型：${getTypeName(type)}
2. 产品/主题：${productName}
3. 卖点/特色：${sellingPoint || '效果好、性价比高、值得推荐'}
4. 用户痛点：${painPoint || '不知道如何选择'}
5. 正文字数：严格控制在${wordCount}
6. 风格：活泼亲切、有感染力、适合小红书平台

【格式要求】
标题：（一句话吸引人的标题，带emoji）
正文：（分段清晰，每段2-3句话，用emoji点缀，总字数${wordCount}）
标签：#标签1 #标签2 #标签3 #标签4 #标签5

请直接输出文案，正文内容要丰富详细，不要敷衍。`;

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'glm-4-flash',
                messages: [
                    {
                        role: 'system',
                        content: '你是小红书爆款文案专家，擅长写吸引人、内容丰富的种草文案。正文必须充实详细，不能太短。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.85,
                max_tokens: length === 'short' ? 2000 : 3000
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        res.status(200).json(data);

    } catch (error) {
        console.error('AI生成失败:', error);
        res.status(500).json({ error: error.message });
    }
}

function getTypeName(type) {
    const names = {
        beauty: '美妆护肤',
        food: '美食探店',
        travel: '旅行攻略',
        fashion: '穿搭分享',
        lifestyle: '生活记录',
        study: '学习干货',
        fitness: '健身运动',
        product: '好物推荐',
        baby: '母婴育儿',
        pet: '宠物分享',
        home: '家居装修',
        tech: '数码科技',
        career: '职场干货'
    };
    return names[type] || '好物推荐';
}