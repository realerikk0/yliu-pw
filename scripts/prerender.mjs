import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const pages = [
  {
    file: 'index.html',
    locale: 'en-US'
  },
  {
    file: 'zh/index.html',
    locale: 'zh-CN'
  }
]

async function prerender() {
  const distDir = resolve(process.cwd(), 'dist')
  const vite = await createServer({
    appType: 'custom',
    clearScreen: false,
    logLevel: 'error',
    server: {
      middlewareMode: true
    }
  })

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    for (const page of pages) {
      const filePath = resolve(distDir, page.file)
      const template = await readFile(filePath, 'utf8')
      const appHtml = render(page.locale)
      const html = template.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)

      await writeFile(filePath, html)
    }
  } finally {
    await vite.close()
  }
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
