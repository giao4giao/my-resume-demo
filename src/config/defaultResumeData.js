// 定义默认简历数据
const defaultResumeData = {
    "mechanical": {
        "avatar": null,
        "name": "张三",
        "title": "机械制造及其自动化专业求职者",
        "phone": "123-4567-8901",
        "email": "zhangsan@email.com",
        "address": "北京市海淀区",
        "school": "北京理工大学",
        "major": "机械制造及其自动化",
        "degree": "本科学位",
        "edu-time": "2018年9月 - 2022年6月",
        "gpa": "3.8/4.0",
        "courses": "机械设计、数控技术、自动化控制系统、工程材料学",
        "skills": [
            "CAD/CAM软件: SolidWorks, AutoCAD, CATIA",
            "编程语言: C++, Python",
            "数控机床操作与编程",
            "机械设计与分析",
            "自动化系统集成",
            "精通Office软件套件"
        ],
        "company": "ABC机械制造有限公司",
        "position": "实习生",
        "intern-time": "2021年7月 - 2021年9月",
        "intern-responsibilities": [
            "参与设计和优化生产线自动化系统,提高生产效率15%",
            "使用SolidWorks进行3D建模,协助完成新产品设计",
            "编写数控程序,操作CNC机床加工零件"
        ],
        "project-name": "智能仓储机器人设计",
        "project-type": "团队项目",
        "project-time": "2022年3月 - 2022年6月",
        "project-details": [
            "设计并制造了一款用于仓储管理的自主移动机器人",
            "负责机械结构设计和运动控制系统开发",
            "项目获得校级创新设计大赛二等奖"
        ],
        "awards": [
            "机械设计工程师资格证书 (2022年)",
            "全国大学生机械创新设计大赛省级三等奖 (2021年)",
            "CET-6英语证书"
        ],
        "traits": [
            "强烈的学习欲望和创新精神",
            "优秀的团队协作能力",
            "良好的沟通和解决问题的能力",
            "注重细节,工作认真负责"
        ]
    },
    "software": {
        "avatar": null,
        "name": "李四",
        "title": "软件工程师",
        "phone": "135-2468-0246",
        "email": "lisi@email.com",
        "address": "上海市浦东新区",
        "school": "复旦大学",
        "major": "计算机科学与技术",
        "degree": "硕士学位",
        "edu-time": "2019年9月 - 2022年6月",
        "gpa": "3.9/4.0",
        "courses": "数据结构与算法、操作系统、计算机网络、软件工程",
        "skills": [
            "编程语言: Java, Python, JavaScript, C++",
            "Web开发: React, Vue.js, Node.js",
            "数据库: MySQL, MongoDB, Redis",
            "工具: Git, Docker, Jenkins",
            "云平台: AWS, Azure"
        ],
        "company": "XYZ科技有限公司",
        "position": "软件开发实习生",
        "intern-time": "2021年7月 - 2021年12月",
        "intern-responsibilities": [
            "参与开发公司核心产品的后端API",
            "使用React和Vue.js开发前端用户界面",
            "编写单元测试,提高代码质量和可维护性"
        ],
        "project-name": "分布式微服务架构电商平台",
        "project-type": "毕业设计",
        "project-time": "2022年1月 - 2022年5月",
        "project-details": [
            "设计并实现了基于微服务架构的电商平台",
            "使用Spring Cloud构建后端服务,React开发前端界面",
            "实现了高并发订单处理和实时库存管理功能"
        ],
        "awards": [
            "ACM程序设计大赛校级一等奖 (2021年)",
            "阿里巴巴全球数学竞赛三等奖 (2020年)",
            "研究生学业奖学金"
        ],
        "traits": [
            "对新技术有强烈的学习热情",
            "善于分析和解决复杂问题",
            "良好的代码风格和文档编写能力",
            "积极主动,能够快速适应新环境"
        ]
    },
    "marketing": {
        "avatar": null,
        "name": "王五",
        "title": "市场营销专员",
        "phone": "187-3579-1357",
        "email": "wangwu@email.com",
        "address": "广州市天河区",
        "school": "中山大学",
        "major": "市场营销",
        "degree": "本科学位",
        "edu-time": "2017年9月 - 2021年6月",
        "gpa": "3.7/4.0",
        "courses": "市场调研、消费者行为学、广告学、品牌管理",
        "skills": [
            "数字营销策略制定与执行",
            "社交媒体营销",
            "数据分析: Google Analytics, Excel",
            "内容创作与管理",
            "项目管理工具: Trello, Asana"
        ],
        "company": "广州ABC广告有限公司",
        "position": "市场助理",
        "intern-time": "2020年7月 - 2020年9月",
        "intern-responsibilities": [
            "协助制定并执行社交媒体营销策略",
            "撰写和编辑营销文案和宣传材料",
            "收集和分析市场数据,为决策提供支持"
        ],
        "project-name": "新品牌线上推广活动",
        "project-type": "团队项目",
        "project-time": "2021年3月 - 2021年5月",
        "project-details": [
            "负责策划和执行新品牌的线上推广活动",
            "管理社交媒体账号,提高品牌知名度",
            "通过数据分析优化营销策略,实现销售额增长20%"
        ],
        "awards": [
            "全国大学生市场调查与分析大赛优秀奖 (2020年)",
            "校级优秀学生干部",
            "CET-6英语证书"
        ],
        "traits": [
            "创新思维,善于提出新颖的营销ideas",
            "优秀的沟通和表达能力",
            "数据驱动,善于利用数据指导决策",
            "团队协作精神强,能够有效管理项目"
        ]
    }
};

// 导出默认简历数据
window.defaultResumeData = defaultResumeData;