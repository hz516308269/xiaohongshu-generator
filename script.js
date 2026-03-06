// 小红书文案生成器 - 主脚本 v3.0
// 新增：智谱AI API接入

// AI配置
const AI_CONFIG = {
    enabled: true,
    provider: 'zhipu',
    dailyFreeLimit: 3 // 每日免费AI生成次数
};

// 文案模板库 - 标题模板
const titleTemplates = {
    beauty: [
        "姐妹们！{keyword}真的绝了！",
        "{keyword}测评｜用了一个月，说说真实感受",
        "终于找到适合我的{keyword}了！",
        "{keyword}避雷指南｜这些坑别踩",
        "{keyword}推荐｜{feature}，效果惊艳！",
        "平价{keyword}测评｜学生党必看",
        "{keyword}使用心得｜{feature}"
    ],
    food: [
        "{keyword}探店｜人均{price}吃到撑！",
        "宝藏{keyword}发现！{feature}",
        "{keyword}测评｜好吃到哭！",
        "终于打卡{keyword}了！{feature}",
        "{keyword}推荐｜本地人都在排队",
        "人均{price}的{keyword}，性价比绝了！",
        "{keyword}｜{feature}，下次还来！"
    ],
    travel: [
        "{keyword}攻略｜{days}天{price}玩到爽",
        "{keyword}旅行记录｜{feature}",
        "终于去了{keyword}！美到窒息",
        "{keyword}小众打卡地｜人少景美",
        "{keyword}一日游｜人均{price}攻略",
        "{keyword}旅行｜照着走不踩雷",
        "周末去哪儿｜{keyword}推荐"
    ],
    fashion: [
        "今日穿搭｜{keyword}+{item}",
        "{keyword}穿搭分享｜显瘦又好看",
        "小个子{keyword}穿搭｜显高yyds",
        "{keyword}怎么搭？看这就够了",
        "{keyword}测评｜{feature}",
        "平价{keyword}分享｜学生党必入",
        "{keyword}穿搭｜{feature}"
    ],
    lifestyle: [
        "分享一个{keyword}！{feature}",
        "{keyword}日常｜幸福感爆棚",
        "最近沉迷{keyword}！{feature}",
        "{keyword}小技巧｜简单又实用",
        "记录{keyword}的一天",
        "{keyword}心得｜{feature}",
        "关于{keyword}，我想说..."
    ],
    study: [
        "{keyword}干货来啦！{feature}",
        "分享我的{keyword}方法！效率翻倍",
        "{keyword}笔记｜建议收藏",
        "{keyword}攻略｜{feature}",
        "从零开始{keyword}｜{feature}",
        "{keyword}经验分享｜亲测有效",
        "{keyword}｜{feature}"
    ],
    fitness: [
        "{keyword}打卡！第{days}天",
        "今日{keyword}｜{feature}",
        "{keyword}初体验｜爱上了！",
        "{keyword}记录｜{feature}",
        "坚持{keyword}的第{days}天",
        "{keyword}分享｜{feature}",
        "从零开始{keyword}"
    ],
    product: [
        "好物推荐｜{keyword}真的太好用了",
        "{keyword}测评｜{feature}",
        "入手了{keyword}！相见恨晚",
        "{keyword}使用感受｜{feature}",
        "{keyword}开箱｜{feature}",
        "平价{keyword}推荐｜性价比超高",
        "{keyword}｜入股不亏！"
    ],
    baby: [
        "{keyword}育儿心得｜{feature}",
        "宝宝{keyword}分享｜{feature}",
        "{keyword}好物推荐｜宝妈必看",
        "{keyword}避雷｜这些坑别踩",
        "新手妈妈{keyword}指南",
        "{keyword}｜{feature}",
        "育儿好物｜{keyword}推荐"
    ],
    pet: [
        "{keyword}萌宠日常｜{feature}",
        "我家{keyword}｜{feature}",
        "{keyword}养护指南｜{feature}",
        "{keyword}好物分享",
        "养{keyword}心得｜{feature}",
        "{keyword}日常｜太可爱了！",
        "{keyword}｜{feature}"
    ],
    home: [
        "{keyword}装修心得｜{feature}",
        "{keyword}改造｜{feature}",
        "家居好物｜{keyword}推荐",
        "{keyword}布置｜{feature}",
        "{keyword}分享｜{feature}",
        "小户型{keyword}｜空间利用",
        "{keyword}｜{feature}"
    ],
    tech: [
        "{keyword}测评｜{feature}",
        "{keyword}开箱｜{feature}",
        "数码好物｜{keyword}推荐",
        "{keyword}使用心得｜{feature}",
        "{keyword}对比｜哪款更值得买",
        "{keyword}｜{feature}",
        "科技好物｜{keyword}"
    ],
    career: [
        "{keyword}职场干货｜{feature}",
        "{keyword}经验分享｜{feature}",
        "职场{keyword}指南",
        "{keyword}心得｜{feature}",
        "关于{keyword}，我想说...",
        "{keyword}技巧｜{feature}",
        "职场成长｜{keyword}"
    ]
};

// 文案内容模板
const contentTemplates = {
    beauty: {
        short: [
            `{keyword}真的绝了！{feature}

作为{skinType}，用过这么多产品，这款真的让我惊喜。{painPoint}的姐妹一定要试试！

{sellingPoint}

姐妹们冲！真的入股不亏！`,

            `终于找到适合我的{keyword}了！

{feature}，效果真的肉眼可见。
{painPoint}？用它就对了！

推荐指数：⭐⭐⭐⭐⭐`
        ],
        long: [
            `{keyword}测评来啦！用了一个月，说说真实感受~

先说我的肤质：{skinType}
主要诉求：{painPoint}

【使用感受】
{feature}

{sellingPoint}

【总结】
这款{keyword}整体体验很好，{painPoint}的姐妹可以试试。性价比也很高，学生党也能入！

建议：{advice}

#护肤 #好物分享 #平价好物`,

            `姐妹们！{keyword}真的绝了！

说实话，刚开始没抱太大期望，结果用了一周就被打脸了！

{feature}

我之前一直被{painPoint}困扰，试过好多产品都没用，直到遇到这个...

{sellingPoint}

现在皮肤状态好了很多，出门都不用遮瑕了！

姐妹们如果有{painPoint}的烦恼，真的可以试试这个！

#护肤心得 #好物推荐`
        ]
    },
    food: {
        short: [
            `{keyword}探店来啦！

📍地址：私信我获取
💰人均：{price}

{feature}

{sellingPoint}

真的好吃到哭！下次还来！`,

            `终于打卡{keyword}了！

{feature}
人均才{price}，性价比绝了！

{sellingPoint}

姐妹们冲！不踩雷！`
        ],
        long: [
            `{keyword}探店｜人均{price}吃到撑！

【环境】
{feature}

【推荐菜品】
{sellingPoint}

【避雷指南】
{advice}

【总体评价】
⭐⭐⭐⭐⭐

真的很好吃！建议早点去排队，不然要等很久~

#美食探店 #宝藏店铺 #美食推荐`,

            `终于去了{keyword}！被安利了好久！

📍坐标：私信获取
💰人均：{price}

{feature}

{sellingPoint}

说实话，去之前觉得可能过誉了，吃完之后只想说——为什么没有早点来！！

几点小建议：
1. 建议提前预约
2. {advice}
3. 人多的话可以多点几个菜

总之，入股不亏！姐妹们记得收藏！

#美食 #探店 #吃货日常`
        ]
    },
    travel: {
        short: [
            `{keyword}攻略来啦！

📍地点：{keyword}
💰花费：{price}
⏰建议游玩：{days}天

{feature}

{sellingPoint}

照着走不踩雷！`,

            `终于去了{keyword}！

{feature}

人均{price}玩到爽！
{sellingPoint}

建议收藏！`
        ],
        long: [
            `{keyword}旅行攻略｜{days}天{price}玩到爽！

【行程安排】
Day1：{route1}
Day2：{route2}

【必打卡】
{feature}

【美食推荐】
{sellingPoint}

【小贴士】
{advice}

【预算明细】
交通：约{transport}
住宿：约{accommodation}
餐饮：约{food}
门票：约{ticket}
总计：约{price}

拍照超出片！姐妹们冲！

#旅行攻略 #周末去哪儿 #小众景点`,

            `{keyword}一日游｜人均{price}攻略来啦！

先说结论：值得去！而且要趁早！

{feature}

【交通】
{transport}

【路线建议】
{route1}

【避坑指南】
{advice}

{sellingPoint}

真的美到窒息！照片根本拍不完！

收藏起来，下次去照着玩！

#旅行 #攻略 #拍照打卡`
        ]
    },
    fashion: {
        short: [
            `今日穿搭｜{keyword}

{feature}

{sellingPoint}

显瘦又好看！出门被夸了好几次！`,

            `{keyword}穿搭分享！

{feature}

{sellingPoint}

小个子也能轻松驾驭！`
        ],
        long: [
            `{keyword}穿搭分享｜显瘦又好看！

【今日OOTD】
上装：{top}
下装：{bottom}
鞋子：{shoes}

【搭配心得】
{feature}

【适合人群】
{target}

{sellingPoint}

【穿搭小技巧】
{advice}

这套真的很显高显瘦！小个子姐妹可以参考~

#穿搭分享 #OOTD #显瘦穿搭`,

            `小个子{keyword}穿搭｜显高yyds！

身高{height}，体重{weight}

{feature}

{sellingPoint}

【搭配公式】
{top} + {bottom} + {shoes}

简单又好看，出门不费力！

{advice}

姐妹们学会了吗？

#小个子穿搭 #日常穿搭 #穿搭灵感`
        ]
    },
    lifestyle: {
        short: [
            `分享一个{keyword}！

{feature}

{sellingPoint}

简单又实用！幸福感up！`,

            `{keyword}日常｜{feature}

{sellingPoint}

生活小确幸~`
        ],
        long: [
            `{keyword}小技巧｜简单又实用！

{feature}

【具体方法】
{sellingPoint}

【注意事项】
{advice}

亲测有效！分享给有需要的姐妹~

#生活小技巧 #日常 #幸福感`,

            `记录{keyword}的一天~

{feature}

{sellingPoint}

生活就是由这些小确幸组成的吧~

{advice}

#生活记录 #日常分享`
        ]
    },
    study: {
        short: [
            `{keyword}干货来啦！

{feature}

{sellingPoint}

建议收藏！`,

            `{keyword}笔记｜{feature}

{sellingPoint}

效率翻倍！`
        ],
        long: [
            `{keyword}攻略｜亲测有效！

【背景】
{painPoint}

【方法】
{feature}

【具体步骤】
{sellingPoint}

【注意事项】
{advice}

坚持了{days}天，效果肉眼可见！

#学习 #干货 #效率提升`,

            `{keyword}心得分享｜效率翻倍！

{feature}

【我的方法】
{sellingPoint}

【常见误区】
{advice}

希望对大家有帮助！一起进步~

#学习方法 #笔记分享 #自我提升`
        ]
    },
    fitness: {
        short: [
            `{keyword}打卡！第{days}天

{feature}

{sellingPoint}

坚持就是胜利！`,

            `今日{keyword}｜{feature}

{sellingPoint}

虽然累但很爽！`
        ],
        long: [
            `{keyword}第{days}天｜身体的变化是最好的动力

【初始状态】
{painPoint}

【今日训练】
{feature}

【心得】
{sellingPoint}

【建议】
{advice}

坚持下去，真的会看到改变！

#健身打卡 #运动 #减肥`,

            `从零开始{keyword}｜{feature}

之前一直想运动但没动力，直到...

{sellingPoint}

【新手建议】
{advice}

现在每天不运动就不舒服，爱上了流汗的感觉！

#健身 #运动打卡 #健康生活`
        ]
    },
    product: {
        short: [
            `好物推荐｜{keyword}

{feature}

{sellingPoint}

入股不亏！`,

            `{keyword}测评｜{feature}

{sellingPoint}

性价比超高！`
        ],
        long: [
            `{keyword}深度测评｜使用了一个月说真话

【入手渠道】
{channel}

【产品参数】
{feature}

【使用感受】
{sellingPoint}

【优缺点】
优点：{pros}
缺点：{cons}

【适合人群】
{target}

【购买建议】
{advice}

综合评分：{rating}/10

#好物测评 #开箱 #种草`,

            `{keyword}开箱｜{feature}

等了好久终于到了！

{sellingPoint}

说实话，{painPoint}一直困扰着我，直到用了这个...

【使用感受】
{feature}

【推荐指数】
{rating}/5

{advice}

#开箱 #好物推荐 #测评`
        ]
    },
    baby: {
        short: [
            `{keyword}育儿心得｜{feature}

{sellingPoint}

宝妈们可以参考！`,

            `宝宝{keyword}分享｜{feature}

{sellingPoint}

新手妈妈必看！`
        ],
        long: [
            `{keyword}育儿心得｜亲测有效！

【宝宝情况】
{painPoint}

【我的方法】
{feature}

【具体步骤】
{sellingPoint}

【注意事项】
{advice}

希望能帮到有同样困扰的妈妈们~

#育儿经验 #宝妈分享 #育儿好物`,

            `新手妈妈{keyword}指南｜{feature}

从怀孕到带娃，踩过的坑太多了...

{sellingPoint}

【经验总结】
{advice}

希望这些经验能帮到新手妈妈们！

#育儿 #新手妈妈 #育儿好物`
        ]
    },
    pet: {
        short: [
            `{keyword}萌宠日常｜{feature}

{sellingPoint}

太可爱了！`,

            `我家{keyword}｜{feature}

{sellingPoint}

治愈系~`
        ],
        long: [
            `{keyword}养护指南｜{feature}

{sellingPoint}

【日常护理】
{advice}

养宠真的需要很多耐心，但看到它们开心的样子，一切都值了~

#萌宠日常 #宠物养护 #治愈系`,

            `养{keyword}心得｜{feature}

从养{keyword}到现在，学到了很多...

{sellingPoint}

【新手建议】
{advice}

希望对想养{keyword}的姐妹有帮助！

#宠物 #萌宠 #养宠心得`
        ]
    },
    home: {
        short: [
            `{keyword}装修心得｜{feature}

{sellingPoint}

值得参考！`,

            `{keyword}改造｜{feature}

{sellingPoint}

幸福感up！`
        ],
        long: [
            `{keyword}装修心得｜{feature}

【装修风格】
{style}

【预算】
{price}

{sellingPoint}

【避坑指南】
{advice}

希望能帮到正在装修的姐妹~

#装修 #家居 #改造`,

            `{keyword}布置｜{feature}

折腾了好久终于满意了！

{sellingPoint}

【布置技巧】
{advice}

家，就是要慢慢经营~

#家居布置 #装修灵感 #生活记录`
        ]
    },
    tech: {
        short: [
            `{keyword}测评｜{feature}

{sellingPoint}

入股不亏！`,

            `{keyword}开箱｜{feature}

{sellingPoint}

真香！`
        ],
        long: [
            `{keyword}深度测评｜{feature}

【产品参数】
{specs}

{sellingPoint}

【优缺点】
优点：{pros}
缺点：{cons}

【购买建议】
{advice}

综合评分：{rating}/10

#数码测评 #开箱 #好物推荐`,

            `{keyword}使用心得｜用了一个月说真话

{feature}

{sellingPoint}

【适合人群】
{target}

【购买渠道】
{channel}

{advice}

#数码好物 #测评 #科技`
        ]
    },
    career: {
        short: [
            `{keyword}职场干货｜{feature}

{sellingPoint}

职场人必看！`,

            `{keyword}经验分享｜{feature}

{sellingPoint}

少走弯路！`
        ],
        long: [
            `{keyword}职场干货｜{feature}

{sellingPoint}

【具体方法】
{advice}

希望能帮到职场中的姐妹们~

#职场 #职场干货 #自我提升`,

            `关于{keyword}，我想说...

{feature}

{sellingPoint}

【我的经验】
{advice}

职场之路，一起加油！

#职场成长 #工作经验 #职场`
        ]
    }
};

// 标签库
const tagLibrary = {
    beauty: ["护肤", "美妆", "好物分享", "平价好物", "学生党必入", "护肤心得", "成分党"],
    food: ["美食", "探店", "吃货日常", "宝藏店铺", "美食推荐", "打卡", "吃货"],
    travel: ["旅行", "攻略", "周末去哪儿", "小众景点", "旅行记录", "拍照打卡", "旅游"],
    fashion: ["穿搭", "OOTD", "显瘦穿搭", "小个子穿搭", "日常穿搭", "穿搭分享", "穿搭灵感"],
    lifestyle: ["生活记录", "日常", "生活小妙招", "幸福感", "日常分享", "生活", "小确幸"],
    study: ["学习", "干货", "效率提升", "学习方法", "笔记分享", "自我提升", "学习心得"],
    fitness: ["健身", "运动打卡", "减肥", "塑形", "健康生活", "运动", "健身日记"],
    product: ["好物推荐", "测评", "种草", "购物分享", "开箱", "好物", "测评分享"],
    baby: ["育儿", "宝妈", "育儿好物", "新手妈妈", "宝宝", "育儿经验", "母婴"],
    pet: ["萌宠", "宠物", "养宠心得", "宠物日常", "治愈系", "猫奴", "铲屎官"],
    home: ["家居", "装修", "家居布置", "改造", "生活记录", "装修灵感", "家居好物"],
    tech: ["数码", "科技", "测评", "开箱", "数码好物", "好物推荐", "科技好物"],
    career: ["职场", "职场干货", "工作", "自我提升", "职场成长", "经验分享", "职业发展"]
};

// 随机选择
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 随机数字
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 检查今日AI使用次数
function getTodayAIUsage() {
    const today = new Date().toDateString();
    const usageDate = localStorage.getItem('aiUsageDate');
    if (usageDate !== today) {
        localStorage.setItem('aiUsageDate', today);
        localStorage.setItem('aiUsageCount', '0');
        return 0;
    }
    return parseInt(localStorage.getItem('aiUsageCount') || '0');
}

function incrementAIUsage() {
    const count = getTodayAIUsage() + 1;
    localStorage.setItem('aiUsageCount', count.toString());
    return count;
}

// 调用智谱AI生成文案（通过安全API代理）
async function generateWithAI(type, productName, sellingPoint, painPoint, length) {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                productName,
                sellingPoint,
                painPoint,
                length
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || data.error);
        }

        const content = data.choices[0].message.content;
        
        // 解析标题和正文
        const lines = content.split('\n').filter(l => l.trim());
        let title = '';
        let bodyLines = [];
        let tags = [];
        let inTags = false;
        let foundTitle = false;
        let foundBody = false;
        
        for (let line of lines) {
            // 检测标签行
            if (line.includes('#') && (line.match(/#\S+/g) || []).length >= 3) {
                const tagMatch = line.match(/#(\S+)/g);
                if (tagMatch) {
                    tags = tagMatch.map(t => t.replace('#', ''));
                }
                inTags = true;
                continue;
            }
            
            // 检测标题
            if (!foundTitle && (line.startsWith('标题') || line.startsWith('【标题】') || line.match(/^[【\[「]/))) {
                title = line.replace(/标题[：:】\]]?\s*/, '').replace(/【.*?】/g, '').replace(/^[「『【\[】\]]/g, '').trim();
                foundTitle = true;
                continue;
            }
            
            // 检测正文开始
            if (!foundBody && (line.startsWith('正文') || line.startsWith('【正文】'))) {
                foundBody = true;
                const bodyContent = line.replace(/正文[：:】\]]?\s*/, '').trim();
                if (bodyContent) {
                    bodyLines.push(bodyContent);
                }
                continue;
            }
            
            // 收集正文内容
            if (foundBody || (foundTitle && !inTags && !line.startsWith('标签'))) {
                bodyLines.push(line);
            }
            
            // 如果还没找到标题，第一行作为标题
            if (!foundTitle && !foundBody && !inTags && lines.indexOf(line) === 0) {
                title = line.replace(/^[【\[「『]/, '').replace(/[】\]」』]$/, '').trim();
                foundTitle = true;
            }
        }

        // 如果没有解析到标题，用产品名
        if (!title || title.length < 5) {
            title = `${productName}推荐｜真的太好用了！`;
        }

        // 如果没有解析到正文，用全部内容
        if (bodyLines.length === 0) {
            bodyLines = lines.filter(l => !l.includes('#') && l !== title);
        }

        // 如果没有解析到标签，生成默认标签
        if (tags.length === 0) {
            tags = generateTags(type, productName);
        }

        // 清理正文中的"正文"字样
        const cleanBody = bodyLines.join('\n').replace(/正文[：:】\]]?\s*/g, '').trim();

        return {
            title: title,
            content: cleanBody,
            tags: tags.slice(0, 8),
            isAI: true
        };

    } catch (error) {
        console.error('AI生成失败:', error);
        return null;
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

// 生成标题
function generateTitle(type, keyword, feature) {
    const titles = titleTemplates[type] || titleTemplates.product;
    let title = randomChoice(titles);
    
    title = title.replace(/{keyword}/g, keyword || '这个好物');
    title = title.replace(/{feature}/g, feature || '效果超好');
    title = title.replace(/{price}/g, randomNum(50, 200));
    title = title.replace(/{days}/g, randomNum(3, 7));
    title = title.replace(/{item}/g, randomChoice(['牛仔裤', '小白鞋', '卫衣', '西装外套']));
    
    return title;
}

// 生成内容
function generateContent(type, productName, sellingPoint, painPoint, length) {
    const typeTemplates = contentTemplates[type] || contentTemplates.product;
    const templates = length === 'short' ? typeTemplates.short : typeTemplates.long;
    let content = randomChoice(templates);
    
    // 替换关键词
    content = content.replace(/{keyword}/g, productName || '这个好物');
    content = content.replace(/{sellingPoint}/g, sellingPoint || '效果很好，性价比高');
    content = content.replace(/{painPoint}/g, painPoint || '不知道怎么选择');
    
    // 生成随机填充内容
    const features = {
        beauty: ['质地轻薄不油腻', '上脸秒吸收', '成分安全温和', '效果肉眼可见', '敏感肌也能用'],
        food: ['味道绝绝子', '环境超有氛围感', '性价比超高', '食材新鲜', '服务很好'],
        travel: ['风景美到窒息', '拍照超出片', '人少景美', '交通便利', '值得一去'],
        fashion: ['显瘦又好看', '质感在线', '百搭又时尚', '性价比超高', '版型很好'],
        lifestyle: ['简单又实用', '幸福感爆棚', '效率翻倍', '超治愈', '很有成就感'],
        study: ['方法简单有效', '一看就会', '效率翻倍', '亲测有效', '逻辑清晰'],
        fitness: ['动作简单好坚持', '效果明显', '适合新手', '不用器械', '燃脂效果很好'],
        product: ['质量超乎预期', '性价比超高', '使用体验极佳', '值得入手', '超出预期'],
        baby: ['宝宝很喜欢', '安全放心', '实用性强', '性价比高', '操作简单'],
        pet: ['萌化了', '治愈系', '互动感强', '好养活', '超乖'],
        home: ['效果满意', '省钱又好看', '很有成就感', '朋友都夸', '生活品质up'],
        tech: ['性能强劲', '颜值在线', '续航给力', '手感很好', '功能强大'],
        career: ['很实用', '逻辑清晰', '干货满满', '受益匪浅', '少走弯路']
    };
    
    const skins = ['干皮', '油皮', '混油皮', '敏感肌', '中性皮肤'];
    const advices = {
        beauty: '建议先在耳后测试，确认不过敏再全脸使用',
        food: '建议提前预约，周末人多需要排队',
        travel: '建议错峰出行，早上人少拍照更好看',
        fashion: '小个子姐妹可以选择短款，更显高',
        lifestyle: '坚持最重要，养成习惯后会越来越顺',
        study: '找到适合自己的方法最重要，不要盲目跟风',
        fitness: '循序渐进，不要一开始就太猛',
        product: '建议先了解自己的需求，再选择合适的产品',
        baby: '每个宝宝情况不同，适合别人的不一定适合自己',
        pet: '养宠需要耐心和责任心，不要一时冲动',
        home: '多看案例，多比较，不要急于做决定',
        tech: '先了解自己的需求，再选择配置',
        career: '持续学习，保持开放的心态'
    };
    
    const channel = ['官网', '旗舰店', '京东', '天猫', '线下门店'];
    const targets = ['学生党', '上班族', '新手小白', '进阶用户', '所有人'];
    const heights = ['155cm', '158cm', '160cm', '162cm', '165cm'];
    const weights = ['45kg', '48kg', '50kg', '52kg', '55kg'];
    const styles = ['简约风', '北欧风', '日式', '现代简约', '轻奢'];
    const routes = ['市区景点', '老城区', '网红打卡地', '美食街', '购物中心'];
    
    content = content.replace(/{feature}/g, randomChoice(features[type] || features.product));
    content = content.replace(/{skinType}/g, randomChoice(skins));
    content = content.replace(/{advice}/g, advices[type] || '适合自己的才是最好的');
    content = content.replace(/{price}/g, randomNum(50, 300));
    content = content.replace(/{days}/g, randomNum(3, 30));
    content = content.replace(/{rating}/g, (Math.random() * 2 + 3).toFixed(1));
    content = content.replace(/{channel}/g, randomChoice(channel));
    content = content.replace(/{target}/g, randomChoice(targets));
    content = content.replace(/{height}/g, randomChoice(heights));
    content = content.replace(/{weight}/g, randomChoice(weights));
    content = content.replace(/{style}/g, randomChoice(styles));
    content = content.replace(/{route1}/g, randomChoice(routes));
    content = content.replace(/{route2}/g, randomChoice(routes));
    content = content.replace(/{transport}/g, randomNum(20, 100) + '元');
    content = content.replace(/{accommodation}/g, randomNum(100, 300) + '元');
    content = content.replace(/{food}/g, randomNum(50, 150) + '元');
    content = content.replace(/{ticket}/g, randomNum(0, 100) + '元');
    content = content.replace(/{top}/g, randomChoice(['白色T恤', '衬衫', '针织衫', '卫衣']));
    content = content.replace(/{bottom}/g, randomChoice(['牛仔裤', '阔腿裤', '半裙', '短裤']));
    content = content.replace(/{shoes}/g, randomChoice(['小白鞋', '帆布鞋', '高跟鞋', '乐福鞋']));
    content = content.replace(/{pros}/g, randomChoice(features[type] || features.product) + '，性价比高');
    content = content.replace(/{cons}/g, randomChoice(['需要时间适应', '库存不多', '包装可以更好', '颜色选择不多']));
    content = content.replace(/{specs}/g, randomChoice(['性能强劲', '配置均衡', '续航优秀', '轻薄便携']));
    
    return content;
}

// 生成标签
function generateTags(type, productName) {
    const baseTags = tagLibrary[type] || [];
    const keywordTag = productName ? [productName] : [];
    const selectedTags = [...keywordTag];
    
    // 随机选择3-4个标签
    const shuffled = baseTags.sort(() => 0.5 - Math.random());
    selectedTags.push(...shuffled.slice(0, 3 + Math.floor(Math.random() * 2)));
    
    return [...new Set(selectedTags)]; // 去重
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 当前生成的结果
let currentResult = {
    title: '',
    content: '',
    tags: []
};

// DOM元素初始化
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const adOverlay = document.getElementById('adOverlay');
    const adCloseBtn = document.getElementById('adCloseBtn');
    const adProgressBar = document.getElementById('adProgressBar');
    const adTimer = document.getElementById('adTimer');
    const countdown = document.getElementById('countdown');
    const resultOverlay = document.getElementById('resultOverlay');
    const resultTitle = document.getElementById('resultTitle');
    const resultContent = document.getElementById('resultContent');
    const resultTags = document.getElementById('resultTags');
    const closeResultBtn = document.getElementById('closeResultBtn');
    const copyTitleBtn = document.getElementById('copyTitleBtn');
    const copyContentBtn = document.getElementById('copyContentBtn');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    
    // AI模式选择
    let useAI = true; // 默认使用AI
    const aiUsage = getTodayAIUsage();
    if (aiUsage >= AI_CONFIG.dailyFreeLimit) {
        useAI = false;
    }
    
    // 生成按钮点击事件
    generateBtn.addEventListener('click', async function() {
        const type = document.getElementById('type').value;
        const productName = document.getElementById('productName').value.trim();
        const sellingPoint = document.getElementById('sellingPoint').value.trim();
        const painPoint = document.getElementById('painPoint').value.trim();
        const length = document.getElementById('length').value;
        
        if (!productName) {
            showToast('请输入产品名或主题');
            return;
        }
        
        // 显示加载状态
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="loading"></span> 生成中...';
        
        // 尝试AI生成
        let aiResult = null;
        const currentAIUsage = getTodayAIUsage();
        
        if (useAI && currentAIUsage < AI_CONFIG.dailyFreeLimit) {
            try {
                aiResult = await generateWithAI(type, productName, sellingPoint, painPoint, length);
                if (aiResult) {
                    incrementAIUsage();
                }
            } catch (e) {
                console.error('AI生成失败，使用模板', e);
            }
        }
        
        // 如果AI失败或次数用完，使用模板
        if (!aiResult) {
            const feature = sellingPoint || '效果很好';
            aiResult = {
                title: generateTitle(type, productName, feature),
                content: generateContent(type, productName, sellingPoint, painPoint, length),
                tags: generateTags(type, productName)
            };
        }
        
        currentResult = aiResult;
        
        // 恢复按钮状态
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span class="btn-icon">✨</span> 生成文案';
        
        // 显示广告弹窗
        adOverlay.classList.add('active');
        
        // 开始广告倒计时
        let seconds = 5;
        adTimer.textContent = seconds + '秒';
        countdown.textContent = seconds;
        adProgressBar.style.width = '0%';
        adCloseBtn.disabled = true;
        adCloseBtn.classList.remove('active');
        
        const interval = setInterval(() => {
            seconds--;
            adTimer.textContent = seconds + '秒';
            countdown.textContent = seconds;
            adProgressBar.style.width = ((5 - seconds) / 5 * 100) + '%';
            
            if (seconds <= 0) {
                clearInterval(interval);
                adCloseBtn.disabled = false;
                adCloseBtn.classList.add('active');
                adCloseBtn.textContent = '关闭广告';
            }
        }, 1000);
    });
    
    // 关闭广告按钮
    adCloseBtn.addEventListener('click', function() {
        if (adCloseBtn.classList.contains('active')) {
            adOverlay.classList.remove('active');
            
            // 显示结果
            resultTitle.textContent = currentResult.title;
            resultContent.textContent = currentResult.content;
            resultTags.innerHTML = currentResult.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
            resultOverlay.classList.add('active');
            
            // 增加使用次数
            incrementUsage();
        }
    });
    
    // 点击遮罩关闭广告（不可关闭）
    adOverlay.addEventListener('click', function(e) {
        if (e.target === adOverlay) {
            // 不允许点击遮罩关闭
        }
    });
    
    // 关闭结果弹窗
    closeResultBtn.addEventListener('click', function() {
        resultOverlay.classList.remove('active');
    });
    
    // 点击遮罩关闭结果
    resultOverlay.addEventListener('click', function(e) {
        if (e.target === resultOverlay) {
            resultOverlay.classList.remove('active');
        }
    });
    
    // 复制标题
    copyTitleBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(currentResult.title).then(() => {
            showToast('标题已复制');
        }).catch(() => {
            showToast('复制失败，请手动复制');
        });
    });
    
    // 复制内容
    copyContentBtn.addEventListener('click', function() {
        const text = currentResult.content + '\n\n' + currentResult.tags.map(t => '#' + t).join(' ');
        navigator.clipboard.writeText(text).then(() => {
            showToast('内容已复制');
        }).catch(() => {
            showToast('复制失败，请手动复制');
        });
    });
    
    // 复制全部
    copyAllBtn.addEventListener('click', function() {
        const fullText = currentResult.title + '\n\n' + currentResult.content + '\n\n' + currentResult.tags.map(t => '#' + t).join(' ');
        navigator.clipboard.writeText(fullText).then(() => {
            showToast('已复制全部内容');
        }).catch(() => {
            showToast('复制失败，请手动复制');
        });
    });
    
    // 重新生成
    regenerateBtn.addEventListener('click', function() {
        resultOverlay.classList.remove('active');
        generateBtn.click();
    });
    
    // 键盘事件：回车生成
    document.getElementById('productName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});

// 记录使用次数
let usageCount = parseInt(localStorage.getItem('usageCount') || '0');
let lastUsageDate = localStorage.getItem('lastUsageDate') || '';
const today = new Date().toDateString();

// 如果是新的一天，重置计数
if (lastUsageDate !== today) {
    usageCount = 0;
    localStorage.setItem('lastUsageDate', today);
}

function incrementUsage() {
    usageCount++;
    localStorage.setItem('usageCount', usageCount.toString());
    localStorage.setItem('lastUsageDate', today);
    
    // 免费版限制提示（可选）
    if (usageCount === 5) {
        setTimeout(() => {
            showToast('今日已使用5次，感谢支持！');
        }, 1000);
    }
}