import { renderToString } from 'react-dom/server'
import App from './App'

type Locale = 'zh-CN' | 'en-US'

export function render(locale: Locale) {
  return renderToString(<App initialLocale={locale} />)
}
