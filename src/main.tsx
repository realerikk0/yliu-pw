import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './assets/normalize.css'
import './styles.css'

const container = document.getElementById('app') as HTMLElement
const locale = document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en-US'
const app = (
  <React.StrictMode>
    <App initialLocale={locale} />
  </React.StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
