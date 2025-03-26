/// <reference types="vite/client" />

// 声明 .vue 文件的模块类型
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 扩展 Window 接口，以支持全局变量
interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
}