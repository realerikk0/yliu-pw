import { createI18n } from 'vue-i18n'

const messages = {
    zhCN: {
        projects: '项目',
        contact: '联系方式',
        language: '语言',
        zhCN: '简体中文',
        enUS: '英文',
        systemArchitect: '系统架构师',
        bio: '专注于分布式系统和人工智能技术',
        dragonYume: '梦珑拌饭',
        leanhub: '零号社区',
        gezhiSign: '鸽纸电签',
        switchLanguage: '切换语言',
        darkMode: '暗色模式',
        lightMode: '亮色模式',
        openSource: 'AI投资顾问',
        creativeContent: '虚拟偶像',
        devCommunity: '科幻社区平台',
        eSignature: '电子签名解决方案'
    },
    enUS: {
        projects: 'Projects',
        contact: 'Contact',
        language: 'Language',
        zhCN: 'Simplified Chinese',
        enUS: 'English',
        systemArchitect: 'System Architect',
        bio: 'Focused on distributed systems and AI technology',
        dragonYume: 'Dragon Yume',
        leanhub: 'Leanhub',
        gezhiSign: 'GezhiSign',
        switchLanguage: 'Switch Language',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        openSource: 'AI Trading Advisor',
        creativeContent: 'Vtuber',
        devCommunity: 'Scifi Community Platform',
        eSignature: 'E-Signature Solution'
    }
}

// 获取用户首选语言
function getPreferredLanguage() {
    // 首先检查本地存储中是否有保存的语言偏好
    const savedLanguage = localStorage.getItem('userLanguage')
    if (savedLanguage && (savedLanguage === 'zhCN' || savedLanguage === 'enUS')) {
        return savedLanguage
    }

    // 如果没有保存的偏好，则使用浏览器语言
    const browserLang = navigator.language
    if (browserLang.startsWith('zh')) {
        return 'zhCN'
    }
    return 'enUS'
}

export const i18n = createI18n({
    legacy: false, // 使用组合式API
    locale: getPreferredLanguage(),
    fallbackLocale: 'enUS',
    messages
})