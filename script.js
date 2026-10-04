/* =========================================================
   script.js — 齐胜龙个人简历 交互逻辑
   ========================================================= */
// 证书内联浮窗控制函数
        function toggleCertPreview(certId, imgUrl, titleText) {
            const panel = document.getElementById('cert-floating-panel');
            const panelImg = document.getElementById('cert-panel-img');
            const panelTitle = document.getElementById('cert-panel-title');
            
            panelTitle.textContent = titleText;
            panelImg.src = imgUrl;
            panel.classList.remove('hidden');
            
            // 平滑滚动到浮窗位置
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function closeCertPreview() {
            const panel = document.getElementById('cert-floating-panel');
            panel.classList.add('hidden');
        }


document.addEventListener('DOMContentLoaded', () => {
    /* =====================================================
       1. 主题切换（深色 / 浅色模式）
       ===================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // 初始状态：读取本地缓存或跟随系统偏好
    const isDarkMode = localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeIcon.classList.replace('text-slate-700', 'text-yellow-400');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeIcon.classList.replace('text-yellow-400', 'text-slate-700');
    }

    // 点击切换
    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');

        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeIcon.classList.replace('text-slate-700', 'text-yellow-400');

            themeToggleBtn.classList.add('rotate-180');
            setTimeout(() => themeToggleBtn.classList.remove('rotate-180'), 300);
        } else {
            localStorage.theme = 'light';
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeIcon.classList.replace('text-yellow-400', 'text-slate-700');

            themeToggleBtn.classList.add('-rotate-180');
            setTimeout(() => themeToggleBtn.classList.remove('-rotate-180'), 300);
        }
    });

    /* =====================================================
       2. 历史项目全景库（时间轴 + 详情联动）
       ===================================================== */
    const timelineList = document.getElementById('timeline-list');
    const projectDetailView = document.getElementById('project-detail-view');
    let activeIndex = 0;

    const projectsData = [
        {
            date: "2026.08 - 至今",
            title: "中信保诚 个险交易接口C2J转换",
            role: "项目经理",
            description: "负责主导将遗留系统的个险交易外围接口由传统的过程式架构向 Spring Boot Java 体系（C2J）转换。制定了全套转换标准与接口协议重构规范。",
            achievements: "保障了外围系统与核心接口的无缝平滑对接，极大降低了系统的技术栈依赖风险与后续运维成本。"
        },
        {
            date: "2025.11 - 2026.07",
            title: "台湾人寿 旅平险数据迁移",
            role: "项目经理",
            description: "全面负责台湾人寿旅平险业务历史数据向新系统底座的平滑迁移工程。从零设计数据清洗规则、ETL迁移链路以及基于不同环境的双轨核查自动化机制。",
            achievements: "确保千万级保单数据实现“零差异”上线，迁移窗口耗时优于预期 20%。"
        },
        {
            date: "2024.11 - 2025.10",
            title: "中信保诚 个险外围批处理C2J重构",
            role: "项目经理",
            description: "针对保险 AS400 平台 COBOL 遗留系统信创能力不足的痛点，担任重构大项目经理。统筹落地自动化代码转换工具链，并对重构后的系统进行高并发事务性能调优。",
            achievements: "成功完成所有批处理程序的 Java 化平移，核心跑批性能翻倍，彻底解除对特定老旧主机的人才与硬件绑定。"
        },
        {
            date: "2024.02 - 2024.10",
            title: "中融人寿 MIS数据平台建设",
            role: "项目经理",
            description: "统筹建设企业级管理信息系统（MIS）数字底座，拉通核保、理赔、财务多方数据壁垒。规划并监督 ETL 数据采集、清洗、入库全生命周期。",
            achievements: "实现了经营分析核心指标的自动化报表生成，管理层数据获取时间由数天缩短至实时，大幅提升决策效率。"
        },
        {
            date: "2023.09 - 2024.01",
            title: "国寿海外团险同构亿级数据迁移",
            role: "项目经理",
            description: "负责主导跨数据库平台（SQL Server 至 MySQL）平滑迁移项目。攻克无主键大表同步、MySQL 关键字冲突、LONGTEXT 类型转换等多重数据底层难点。",
            achievements: "以 100% 生产环境行级比对通过率，在极短的 4 小时割接窗口期内完成了亿级历史数据的整体迁移与校验。"
        },
        {
            date: "2023.06 - 2023.08",
            title: "和谐健康 全面计划管理数据模型 (ODS-DWS)",
            role: "项目经理",
            description: "牵头开展数据中台核心数据仓库的分层建模（ODS 至 DWS）。落地企业级全面预算及计划管理业务的数据标准建立，梳理复杂的多维分析维度。",
            achievements: "构建出高可用的大数据集市底座，稳健支撑了后端复杂精算逻辑计算与可视化报表需求。"
        },
        {
            date: "2023.05 - 2023.06",
            title: "中银三星 监管集市平台建设",
            role: "项目经理",
            description: "精准对接银保监会最新数据报送规范，主导“贴源落地-标准化治理-差异化输出”的全链路监管分层架构设计与平台开发统筹。",
            achievements: "成功实现监管数据采集与报送的 100% 自动化闭环，消除了监管错报、漏报风险。"
        },
        {
            date: "2022.04 - 2023.04",
            title: "PICC人保健康 商保核心架构升级 (信创)",
            role: "系统架构设计师 / 项目经理",
            description: "身兼架构师与大项目经理双重职能，主导商保核心全面微服务化与信创化改造。负责用户、产品、契约专属中心设计，引入 GaussDB 与 MQ 消息队列中间件解耦。",
            achievements: "建成高并发、高可用（两地三中心异地双活）的云原生架构底座，全面满足国家信创战略要求。"
        },
        {
            date: "2021.06 - 2022.03",
            title: "和谐健康 LIS6升LIS7核心数据迁移",
            role: "项目经理",
            description: "承接跨越大版本迭代（LIS6 -> LIS7）的高难度核心升级迁移任务。涉及 1700 万保单、13 亿行历史记录的清洗与模型转换，开发定制化高并发迁移引擎。",
            achievements: "在零生产事故的前提下完成了特大数据体量的转换，业务验证一次性通过率极高。"
        },
        {
            date: "2021.01 - 2021.05",
            title: "国寿海外 新加坡IL到ONELIFE资料转移",
            role: "项目经理",
            description: "负责跨国、跨系统的离岸业务核心系统替换数据重构。统筹处理多币种、跨时区、多地监管准则下的复杂业务逻辑适配与底层数据映射。",
            achievements: "确保了离岸核心系统数据的精确移植与绝对安全合规。"
        },
        {
            date: "2020.09 - 2020.12",
            title: "中银三星 个险承保接口效率专项调优",
            role: "项目经理 / 性能专家",
            description: "针对核心业务早高峰期个险承保接口频发的超时瓶颈，挂帅开展性能调优专项行动。重构核心验核逻辑，实施全链路剖析与 DB 慢查询调优。",
            achievements: "核心接口平均响应时间缩短，整体业务吞吐效率显著提升 53% - 88%。"
        },
        {
            date: "2019.04 - 2020.08",
            title: "台湾人寿 CAS至VLIFE资料移转重构",
            role: "项目经理",
            description: "统筹主导核心退役替换的“硬骨头”数据重构工程。为应对繁杂异构数据源，带领团队攻关自研了基于 Spring Boot + Vue 的专利级数据迁移配置工具箱。",
            achievements: "实现了迁移规则与代码逻辑的解耦，大幅提升了后续同类移转项目的交付复用率与开发效能。"
        },
        {
            date: "2018.06 - 2019.03",
            title: "泰康养老 极速理赔系统",
            role: "项目经理",
            description: "基于微服务理念规划并实施极速理赔平台，结合 OCR 图像验真与医疗大数据，引入智能自动化理算引擎闭环设计。",
            achievements: "极大地提升了自动化理赔直转率，将端到端客户理赔等待时效缩减至分钟级甚至秒级。"
        },
        {
            date: "2017.04 - 2018.05",
            title: "农银人寿 企业大数据平台",
            role: "项目经理",
            description: "搭建企业级数据湖及 ODS / EDW 体系。负责统筹整合银保渠道、个险渠道等多渠道零散数据模型，建立统一数仓架构。",
            achievements: "打破信息孤岛，为上层大数据用户画像、精准营销与智能核保提供了稳定统一的数据支撑服务。"
        },
        {
            date: "2016.05 - 2017.03",
            title: "安邦人寿 互联网寿险云核心研发",
            role: "项目经理 / 系统架构师",
            description: "从 0 到 1 牵头主导研发了基于 Dubbo 分布式框架的互联网寿险云核心系统。设计高并发秒杀机制、内存缓存及削峰填谷策略。",
            achievements: "开创了中科软微服务应用落地先河，完美支撑了大规模互联网爆款保险产品的瞬时高并发投保洪峰。"
        },
        {
            date: "2012.01 - 2016.04",
            title: "中保信平台对接及综合IT系统建设",
            role: "项目经理",
            description: "期间长期担纲核心项目经理，成功主导交付中保信各类监管对接平台、中再寿数据预处理、三星人寿核心转换等十余个重点项目。",
            achievements: "积累了全面且深厚的保险全域业务认知，锻造了成熟的大型 IT 项目统筹与风险管理能力。"
        }
    ];

    /* ---------- 渲染左侧时间轴列表 ---------- */
    function renderTimelineItems() {
        if (!timelineList) return;

        timelineList.innerHTML = projectsData.map((proj, index) => {
            const isActive = index === activeIndex;
            const borderClass = isActive ? 'border-primary' : 'border-slate-200 dark:border-slate-700';
            const bgClass = isActive ? 'bg-slate-100 dark:bg-slate-800/80' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40';
            const dotClass = isActive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-primary/50';
            const dateClass = isActive ? 'text-primary dark:text-sky-400' : 'text-slate-500';

            return `
                <div class="relative pl-6 py-4 cursor-pointer transition-all border-l-2 ${borderClass} ${bgClass} group" onclick="selectProject(${index})">
                    <div class="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 ring-white dark:ring-darkCard transition-colors ${dotClass}"></div>
                    <div class="text-xs font-bold ${dateClass} mb-1">${proj.date}</div>
                    <div class="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">${proj.title}</div>
                    <div class="text-xs ${isActive ? 'text-primary/80 dark:text-sky-300' : 'text-slate-500'} mt-2 flex items-center gap-1 font-medium bg-white/50 dark:bg-slate-900/50 inline-block px-2 py-0.5 rounded">
                        <i class="fa-solid fa-user-tie"></i> 担任: ${proj.role}
                    </div>
                </div>
            `;
        }).join('');
    }

    /* ---------- 选中某个项目：联动渲染右侧详情 ---------- */
    window.selectProject = function (index) {
        activeIndex = index;
        renderTimelineItems();

        const proj = projectsData[index];
        if (!projectDetailView) return;

        projectDetailView.innerHTML = '';

        setTimeout(() => {
            projectDetailView.innerHTML = `
                <div class="animate-fade-in">
                    <div class="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary dark:text-sky-400 text-xs font-bold border border-primary/20">
                        <i class="fa-solid fa-calendar-check"></i> ${proj.date}
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">${proj.title}</h3>
                    <div class="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 px-3 py-1.5 rounded-md flex items-center gap-2">
                            <i class="fa-solid fa-user-gear text-primary dark:text-sky-400"></i> ${proj.role}
                        </span>
                    </div>

                    <div class="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <div>
                            <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-base">
                                <i class="fa-solid fa-crosshairs text-primary"></i> 核心职责与背景
                            </h4>
                            <p class="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm">${proj.description}</p>
                        </div>
                        ${proj.achievements ? `
                        <div>
                            <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-base">
                                <i class="fa-solid fa-trophy text-yellow-500"></i> 交付成果与业务价值
                            </h4>
                            <p class="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm text-slate-700 dark:text-slate-200 font-medium">
                                ${proj.achievements}
                            </p>
                        </div>` : ''}
                    </div>
                </div>
            `;
        }, 10);
    };

    /* ---------- 初始化渲染 ---------- */
    if (timelineList && projectDetailView) {
        selectProject(0);
    }
});