<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { t, locale } = useI18n()

// 定义项目接口
interface Project {
  year: string;
  url: string;
  nameZh: string;
  nameEn: string;
  description?: {
    zh: string;
    en: string;
  };
}

// 项目数据，支持多语言
const projects: Project[] = [
  {
    year: '2025',
    url: 'https://openstrat.ai/',
    nameZh: 'Openstrat AI',
    nameEn: 'Openstrat AI',
    description: {
      zh: 'AI投资顾问',
      en: 'AI Trading Advisor'
    }
  },
  {
    year: '2022',
    url: 'https://space.bilibili.com/1849006220/',
    nameZh: '梦珑拌饭',
    nameEn: 'Dragon Yume',
    description: {
      zh: '虚拟偶像',
      en: 'Vtuber'
    }
  },
  {
    year: '2020',
    url: 'http://leanhub.cn',
    nameZh: '零号社区',
    nameEn: 'Leanhub',
    description: {
      zh: '科幻社区平台',
      en: 'Scifi Community Platform'
    }
  },
  {
    year: '2018',
    url: 'http://gezhi.ink',
    nameZh: '鸽纸电签',
    nameEn: 'GezhiSign',
    description: {
      zh: '电子签名解决方案',
      en: 'E-Signature Solution'
    }
  }
]

// 动画效果的延迟
const calculateDelay = (index: number): string => {
  return `${index * 0.1}s`;
}

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === 'zhCN' ? 'enUS' : 'zhCN'
  // 保存语言偏好到本地存储
  localStorage.setItem('userLanguage', locale.value)
}

// 获取项目名称，根据当前语言
const getProjectName = (project: Project): string => {
  return locale.value === 'zhCN' ? project.nameZh : project.nameEn
}

// 获取项目描述，根据当前语言
const getProjectDescription = (project: Project): string => {
  if (!project.description) return '';
  return locale.value === 'zhCN' ? project.description.zh : project.description.en
}

// 暗色模式切换
const isDarkMode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

// 切换暗色模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
}

// 根据当前模式获取图标
const modeIcon = computed(() => isDarkMode.value ? '☀️' : '🌙')
</script>

<template>
  <div id="holder" :class="{ 'dark': isDarkMode }">
    <div class="header">
      <h1 class="name">Yuan Liu</h1>
      <p class="title">{{ t('systemArchitect') }}</p>
      <p class="bio">{{ t('bio') }}</p>
    </div>

    <div class="content">
      <h2 class="section-title">{{ t('projects') }}</h2>
      <ul id="items">
        <li v-for="(project, index) in projects"
            :key="project.year"
            class="project-item"
            :style="{ 'animation-delay': calculateDelay(index) }">
          <div class="project-year">{{ project.year }}</div>
          <div class="project-details">
            <a :href="project.url" target="_blank" class="project-link">
              {{ getProjectName(project) }}
            </a>
            <div class="project-description">{{ getProjectDescription(project) }}</div>
          </div>
        </li>
      </ul>

      <div class="footer">
        <div class="contact">
          <p><strong>{{ t('contact') }}:</strong> <a href="mailto:yuan@lilyn.cn">Erik Liu</a></p>
        </div>

        <div class="controls">
          <button class="mode-toggle" @click="toggleDarkMode">{{ modeIcon }}</button>
          <button class="lang-toggle" @click="toggleLanguage">
            {{ locale === 'zhCN' ? 'EN' : '中' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --accent-color: #3498db;
  --muted-color: #888888;
  --border-color: #eeeeee;
  --hover-color: #2980b9;
  --card-bg: #f8f8f8;
}

.dark {
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
}
</style>

<style scoped>
#holder {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeIn 0.8s ease-in-out;
}

.name {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color);
}

.title {
  font-size: 1.4rem;
  color: var(--accent-color);
  margin-bottom: 12px;
}

.bio {
  font-size: 1.1rem;
  color: var(--muted-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-title {
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--accent-color);
}

#items {
  padding: 0;
  list-style-type: none;
}

.project-item {
  display: flex;
  margin-bottom: 35px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-year {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--muted-color);
  min-width: 60px;
  padding-top: 2px;
}

.project-details {
  flex: 1;
}

.project-link {
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-block;
  margin-bottom: 8px;
  position: relative;
}

.project-link:hover {
  color: var(--hover-color);
}

.project-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--hover-color);
  transition: width 0.3s ease;
}

.project-link:hover::after {
  width: 100%;
}

.project-description {
  color: var(--muted-color);
  font-size: 1rem;
}

.footer {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact a:hover {
  color: var(--hover-color);
}

.controls {
  display: flex;
  gap: 15px;
}

.mode-toggle, .lang-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.mode-toggle:hover, .lang-toggle:hover {
  background-color: var(--accent-color);
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  #holder {
    margin-top: 40px;
  }

  .name {
    font-size: 2.2rem;
  }

  .title {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .project-item {
    flex-direction: column;
  }

  .project-year {
    margin-bottom: 10px;
  }

  .footer {
    flex-direction: column;
    gap: 20px;
  }

  .controls {
    width: 100%;
    justify-content: center;
  }
}
</style>