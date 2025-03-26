<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// 检查暗色模式偏好
onMounted(() => {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  // 根据用户偏好设置初始模式
  if (prefersDark) {
    document.documentElement.classList.add('dark-mode')
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    document.documentElement.classList.toggle('dark-mode', event.matches)
  })
})
</script>

<template>
  <RouterView />
</template>

<style>
/* 全局基础样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 颜色变量 */
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --accent-color: #3498db;
  --muted-color: #888888;
  --border-color: #eeeeee;
  --hover-color: #2980b9;
  --card-bg: #f8f8f8;
}

/* 暗色模式颜色变量 */
html.dark-mode {
  --background-color: #1a1a1a;
  --text-color: #e0e0e0;
  --accent-color: #61dafb;
  --muted-color: #a0a0a0;
  --border-color: #333333;
  --hover-color: #4fc3f7;
  --card-bg: #262626;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  min-height: 100vh;
  line-height: 1.6;
}

/* 响应式设计 - 全局 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
</style>