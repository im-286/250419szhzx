document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initCharts();
    
    // Toggle TOC on mobile
    const tocToggle = document.getElementById('toc-toggle');
    const toc = document.getElementById('toc');
    
    if (tocToggle && toc) {
        tocToggle.addEventListener('click', function() {
            toc.classList.toggle('hidden');
        });
    }

    // Make TOC sticky on desktop
    window.addEventListener('scroll', function() {
        if (window.innerWidth >= 768) { // Only on desktop
            const tocElement = document.getElementById('toc');
            if (tocElement) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 120) {
                    tocElement.classList.add('md:sticky');
                    tocElement.classList.add('top-20');
                } else {
                    tocElement.classList.remove('md:sticky');
                    tocElement.classList.remove('top-20');
                }
            }
        }
    });

    // Highlight active TOC link based on scroll position
    window.addEventListener('scroll', highlightActiveTocLink);

    // Report tabs navigation
    const reportTabs = document.querySelectorAll('.report-tab');
    reportTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            reportTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle content switching based on data-section attribute
            // This would be implemented if we had separate content sections
            const section = this.getAttribute('data-section');
            console.log(`Switching to section: ${section}`);
            // For now, this just logs which section was clicked
        });
    });

    // Industry tabs interaction
    const industryTabs = document.querySelectorAll('.industry-tab');
    industryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            industryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            document.querySelectorAll('.industry-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show the selected content
            const industry = this.getAttribute('data-industry');
            const contentElement = document.getElementById(`industry-${industry}-content`);
            if (contentElement) {
                contentElement.classList.remove('hidden');
            }
        });
    });

    // Recommendation tabs interaction
    const recommendationTabs = document.querySelectorAll('.recommendation-tab');
    recommendationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            recommendationTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            document.querySelectorAll('.recommendation-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show the selected content
            const target = this.getAttribute('data-target');
            const contentElement = document.getElementById(`${target}-recommendations`);
            if (contentElement) {
                contentElement.classList.remove('hidden');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close TOC on mobile after clicking a link
                if (window.innerWidth < 768) {
                    toc.classList.add('hidden');
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Prevent zooming
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if (isPinching) e.preventDefault();
    }, { passive: false });
});

function highlightActiveTocLink() {
    // Get all section elements
    const sections = document.querySelectorAll('section[id]');
    
    // Get current scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Find the section that's currently in view
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset to trigger earlier
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Remove active class from all TOC links
    document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the current section's TOC link
    if (currentSection) {
        const activeLink = document.querySelector(`.toc-link[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function initCharts() {
    // Digital Transformation Penetration Rate Comparison Chart
    const penetrationCtx = document.getElementById('penetrationChart');
    if (penetrationCtx) {
        new Chart(penetrationCtx, {
            type: 'bar',
            data: {
                labels: ['中国中小企业', '欧洲中小企业', '美国中小企业', '日本中小企业'],
                datasets: [{
                    label: '数字化转型普及率 (%)',
                    data: [25, 61, 58, 45],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(234, 179, 8, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(168, 85,247, 0.7)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(234, 179, 8, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(168, 85,247, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: '百分比 (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: false,
                        text: '数字化转型普及率国际比较'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Industry Penetration Chart
    const industryPenetrationCtx = document.getElementById('industryPenetrationChart');
    if (industryPenetrationCtx) {
        new Chart(industryPenetrationCtx, {
            type: 'bar',
            data: {
                labels: ['服务业', '制造业', '农业'],
                datasets: [{
                    label: '数字化渗透率 (%)',
                    data: [44.7, 32.3, 10.5],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: '百分比 (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: false,
                        text: '各行业数字化渗透率'
                    }
                }
            }
        });
    }

    // Policy Support System Chart
    const policySupportChart = document.getElementById('policySupport');
    if (policySupportChart) {
        const policyChart = echarts.init(policySupportChart);
        const policyOption = {
            title: {
                text: '中小企业数字化转型政策支持体系',
                left: 'center',
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            series: [
                {
                    type: 'treemap',
                    data: [
                        {
                            name: '组织保障',
                            value: 25,
                            children: [
                                { name: '工作领导小组', value: 10 },
                                { name: '部门协同机制', value: 8 },
                                { name: '实施机构', value: 7 }
                            ]
                        },
                        {
                            name: '资金支持',
                            value: 30,
                            children: [
                                { name: '专项资金', value: 12 },
                                { name: '补贴政策', value: 10 },
                                { name: '融资便利', value: 8 }
                            ]
                        },
                        {
                            name: '人才保障',
                            value: 20,
                            children: [
                                { name: '领军人才培训', value: 7 },
                                { name: '实训计划', value: 7 },
                                { name: '专业人才培养', value: 6 }
                            ]
                        },
                        {
                            name: '标准体系',
                            value: 15,
                            children: [
                                { name: '评价体系', value: 5 },
                                { name: '标准规范', value: 5 },
                                { name: '国家标准', value: 5 }
                            ]
                        },
                        {
                            name: '产业集群',
                            value: 10,
                            children: [
                                { name: '产业园区', value: 5 },
                                { name: '示范基地', value: 5 }
                            ]
                        }
                    ]
                }
            ]
        };
        policyChart.setOption(policyOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            policyChart.resize();
        });
    }

    // Common Needs Chart
    const commonNeedsChart = document.getElementById('commonNeedsChart');
    if (commonNeedsChart) {
        const needsChart = echarts.init(commonNeedsChart);
        const needsOption = {
            title: {
                text: '中小企业数字化转型的共性需求',
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}'
            },
            legend: {
                data: ['轻量化', '一站式', '生态化'],
                bottom: 10
            },
            series: [
                {
                    name: '共性需求',
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: [
                        { name: '中小企业需求' },
                        { name: '轻量化' },
                        { name: '一站式' },
                        { name: '生态化' },
                        { name: '界面友好' },
                        { name: '功能模块化' },
                        { name: '部署灵活' },
                        { name: '价格透明' },
                        { name: '全流程服务' },
                        { name: '场景化方案' },
                        { name: '集成能力' },
                        { name: '实施支持' },
                        { name: '供应链协同' },
                        { name: '产业集群协同' },
                        { name: '金融服务协同' },
                        { name: '创新协同' }
                    ],
                    links: [
                        { source: '中小企业需求', target: '轻量化', value: 5 },
                        { source: '中小企业需求', target: '一站式', value: 4 },
                        { source: '中小企业需求', target: '生态化', value: 3 },
                        { source: '轻量化', target: '界面友好', value: 1.5 },
                        { source: '轻量化', target: '功能模块化', value: 1.5 },
                        { source: '轻量化', target: '部署灵活', value: 1 },
                        { source: '轻量化', target: '价格透明', value: 1 },
                        { source: '一站式', target: '全流程服务', value: 1.2 },
                        { source: '一站式', target: '场景化方案', value: 1 },
                        { source: '一站式', target: '集成能力', value: 0.8 },
                        { source: '一站式', target: '实施支持', value: 1 },
                        { source: '生态化', target: '供应链协同', value: 1 },
                        { source: '生态化', target: '产业集群协同', value: 0.7 },
                        { source: '生态化', target: '金融服务协同', value: 0.8 },
                        { source: '生态化', target: '创新协同', value: 0.5 }
                    ]
                }
            ]
        };
        needsChart.setOption(needsOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            needsChart.resize();
        });
    }

    // Regional Map Chart
    const regionalMapChart = document.getElementById('regionalMapChart');
    if (regionalMapChart) {
        const mapChart = echarts.init(regionalMapChart);
        // In a real scenario, this would use an actual GeoJSON map of China
        // For this example, we'll create a simplified visualization
        const mapOption = {
            title: {
                text: '中国区域数字化转型水平分布',
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            visualMap: {
                min: 0,
                max: 100,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#f2f2f2', '#d4e6f6', '#a6cee3', '#74b9eb', '#3182bd']
                }
            },
            series: [
                {
                    name: '数字化水平指数',
                    type: 'map',
                    map: 'china',
                    roam: true,
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: [
                        {name: '北京', value: 89},
                        {name: '天津', value: 78},
                        {name: '河北', value: 65},
                        {name: '山西', value: 55},
                        {name: '内蒙古', value: 53},
                        {name: '辽宁', value: 68},
                        {name: '吉林', value: 61},
                        {name: '黑龙江', value: 58},
                        {name: '上海', value: 91},
                        {name: '江苏', value: 85},
                        {name: '浙江', value: 87},
                        {name: '安徽', value: 67},
                        {name: '福建', value: 75},
                        {name: '江西', value: 63},
                        {name: '山东', value: 76},
                        {name: '河南', value: 62},
                        {name: '湖北', value: 69},
                        {name: '湖南', value: 67},
                        {name: '广东', value: 90},
                        {name: '广西', value: 59},
                        {name: '海南', value: 61},
                        {name: '重庆', value: 72},
                        {name: '四川', value: 70},
                        {name: '贵州', value: 58},
                        {name: '云南', value: 56},
                        {name: '西藏', value: 42},
                        {name: '陕西', value: 65},
                        {name: '甘肃', value: 48},
                        {name: '青海', value: 46},
                        {name: '宁夏', value: 51},
                        {name: '新疆', value: 49}
                    ]
                }
            ]
        };
        
        // Since we don't have actual China map data loaded, display a placeholder
        const placeholderOption = {
            title: {
                text: '区域数字化水平分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['东部地区', '中部地区', '西部地区']
            },
            series: [
                {
                    name: '数字化水平',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 80, name: '东部地区'},
                        {value: 60, name: '中部地区'},
                        {value: 45, name: '西部地区'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        mapChart.setOption(placeholderOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            mapChart.resize();
        });
    }

    // Market Growth Chart
    const marketGrowthChart = document.getElementById('marketGrowthChart');
    if (marketGrowthChart) {
        const growthChart = echarts.init(marketGrowthChart);
        const growthOption = {
            title: {
                text: '中小企业数字化转型市场规模预测 (2025-2030)',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let result = `${params[0].axisValue}年<br/>`;
                    params.forEach(param => {
                        result += `${param.seriesName}: ${param.value}${param.seriesIndex === 0 ? '万亿元' : '%'}<br/>`;
                    });
                    return result;
                }
            },
            legend: {
                data: ['市场规模(万亿元)', '年增长率(%)'],
                bottom: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2025', '2026', '2027', '2028', '2029', '2030']
            },
            yAxis: [
                {
                    type: 'value',
                    name: '市场规模(万亿元)',
                    min: 0,
                    max: 3.5,
                    position: 'left'
                },
                {
                    type: 'value',
                    name: '年增长率(%)',
                    min: 0,
                    max: 40,
                    position: 'right'
                }
            ],
            series: [
                {
                    name: '市场规模(万亿元)',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                    data: [1.2, 1.6, 2.0, 2.4, 2.7, 3.0],
                    lineStyle: {
                        width: 3,
                        color: '#000'
                    },
                    itemStyle: {
                        color: '#000'
                    }
                },
                {
                    name: '年增长率(%)',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    data: [33, 32, 31, 30, 29, 28],
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    },
                    itemStyle: {
                        color: '#999'
                    }
                }
            ]
        };
        growthChart.setOption(growthOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            growthChart.resize();
        });
    }

    // SaaS Market Chart
    const saasChart = document.getElementById('saasChart');
    if (saasChart) {
        new Chart(saasChart, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [{
                    label: 'SaaS市场规模(亿元)',
                    data: [3200, 4300, 5800, 7800, 10400, 13900],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '市场规模(亿元)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: false,
                        text: 'SaaS服务市场规模预测'
                    }
                }
            }
        });
    }

    // IIoT Market Chart
    const iiotChart = document.getElementById('iiotChart');
    if (iiotChart) {
        new Chart(iiotChart, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [{
                    label: '工业互联网平台市场规模(亿元)',
                    data: [2500, 3400, 4600, 6200, 8300, 11200],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '市场规模(亿元)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: false,
                        text: '工业互联网平台市场规模预测'
                    }
                }
            }
        });
    }

    // Regional Market Distribution Chart
    const regionalMarketChart = document.getElementById('regionalMarketChart');
    if (regionalMarketChart) {
        const regionChart = echarts.init(regionalMarketChart);
        const regionOption = {
            title: {
                text: '区域市场分布预测',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['东部地区', '中部地区', '西部地区'],
                bottom: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['2025', '2026', '2027', '2028', '2029', '2030']
            },
            yAxis: {
                type: 'value',
                name: '市场份额(%)'
            },
            series: [
                {
                    name: '东部地区',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [70, 69, 68, 67, 66, 65]
                },
                {
                    name: '中部地区',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [20, 21, 21, 22, 22, 23]
                },
                {
                    name: '西部地区',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [10, 10, 11, 11, 12, 12]
                }
            ]
        };
        regionChart.setOption(regionOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            regionChart.resize();
        });
    }


        // Investment Matrix Chart
    const investmentMatrix = document.getElementById('investmentMatrix');
    if (investmentMatrix) {
        const matrixChart = echarts.init(investmentMatrix);
        const matrixOption = {
            title: {
                text: '投资机会评估矩阵',
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    return `${params.data.name}<br/>技术成熟度: ${params.data.x}<br/>市场接受度: ${params.data.y}<br/>政策支持度: ${params.data.z}<br/>市场规模: ${params.data.value}亿元`;
                }
            },
            grid: {
                left: '8%',
                right: '5%',
                bottom: '12%',
                top: '10%'
            },
            xAxis: {
                type: 'value',
                name: '技术成熟度',
                min: 0,
                max: 100,
                nameLocation: 'middle',
                nameGap: 30
            },
            yAxis: {
                type: 'value',
                name: '市场接受度',
                min: 0,
                max: 100,
                nameLocation: 'middle',
                nameGap: 30
            },
            series: [
                {
                    name: '投资机会',
                    type: 'scatter',
                    symbolSize: function (data) {
                        // 增大气泡尺寸，使其更加明显
                        return Math.sqrt(data[3]) / 2;
                    },
                    emphasis: {
                        focus: 'self',
                        label: {
                            show: true,
                            formatter: function (param) {
                                return param.data.name;
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 120, 120, 0.5)',
                        shadowOffsetY: 5,
                        opacity: 0.8
                    },
                    data: [
                        {
                            name: 'SaaS服务',
                            value: 13900,
                            x: 90,
                            y: 80,
                            z: 85
                        },
                        {
                            name: '工业互联网平台',
                            value: 11200,
                            x: 75,
                            y: 65,
                            z: 95
                        },
                        {
                            name: '数字营销服务',
                            value: 9500,
                            x: 85,
                            y: 75,
                            z: 70
                        },
                        {
                            name: '供应链协同平台',
                            value: 7800,
                            x: 80,
                            y: 70,
                            z: 80
                        },
                        {
                            name: 'AI应用服务',
                            value: 6500,
                            x: 65,
                            y: 60,
                            z: 85
                        },
                        {
                            name: '管理咨询服务',
                            value: 5200,
                            x: 75,
                            y: 55,
                            z: 65
                        },
                        {
                            name: '智慧农业服务',
                            value: 3800,
                            x: 60,
                            y: 45,
                            z: 90
                        }
                    ]
                }
            ],
            visualMap: [
                {
                    left: 'right',
                    top: 'top',
                    dimension: 4,
                    min: 60,
                    max: 100,
                    itemWidth: 30,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['政策支持度'],
                    textGap: 30,
                    inRange: {
                        color: [
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027'
                        ]
                    },
                    textStyle: {
                        color: '#333'
                    }
                }
            ]
        };
        matrixChart.setOption(matrixOption);
        
        // Handle resize
        window.addEventListener('resize', function() {
            matrixChart.resize();
        });
    }
}
