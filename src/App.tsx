import { useEffect, useState } from 'react'

type Locale = 'zh-CN' | 'en-US'

type CommandSection = {
  command: string
  body: string
}

type Project = {
  key: string
  summary: string
  href?: string
}

type Experience = {
  company: string
  period: string
  summary: string
}

type Contact = {
  label: string
  value: string
  href: string
}

type Copy = {
  promptHost: string
  identity: string
  hero: string[]
  about: CommandSection
  projectHeading: string
  projectSections: Project[]
  experienceHeading: string
  experiences: Experience[]
  contactHeading: string
  contacts: Contact[]
  footer: string
  languageToggle: string
}

const localeKey = 'site-locale'
const pixelGlyphs: Record<string, string[]> = {
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '11111'],
  ' ': ['000', '000', '000', '000', '000', '000', '000']
}

const copy: Record<Locale, Copy> = {
  'en-US': {
    promptHost: 'visitor@california:~$',
    identity: 'Erik Liu',
    hero: [
      'Freedom through logic.',
      'Structure by design.'
    ],
    about: {
      command: 'cat about.md',
      body:
        'I work across frontend, backend, infrastructure, deployment, and AI workflows. My stack spans React, Vue, Python, PHP, Node.js, C#, Tauri, CI/CD, cloud services, data systems, and LLM-driven products.'
    },
    projectHeading: 'tree work/ --depth 1',
    projectSections: [
      {
        key: 'OPENSTRAT',
        href: 'https://openstrat.ai/',
        summary:
          'AI investment assistant for US equities and crypto. I led architecture, data subscriptions, high-frequency sync, cleaning pipelines, backtesting infrastructure, and reliable LLM serving.'
      },
      {
        key: 'YUME_DESKTOP',
        summary:
          'Real-time AI companion desktop app powered by ASR, memory systems, TTS, motion generation, and Unreal Engine. I owned planning, technical direction, model training, integration, and Steam release.'
      },
      {
        key: 'LEANHUB',
        summary:
          'Sci-fi community platform with video, recommendation systems, multi-platform delivery, OSS/CDN distribution, Redis, MySQL, ffmpeg pipelines, and production release workflows.'
      },
      {
        key: 'GEZHI_ESIGN',
        summary:
          'Digital contract and e-sign platform with certificates, face verification, and in-person signing. I handled product design, architecture, full-stack development, and deployment.'
      }
    ],
    experienceHeading: 'grep timeline experience.log',
    experiences: [
      {
        company: 'Covenate / Lianlu Tech',
        period: '2017-2021',
        summary:
          'Built and shipped blockchain-backed and certificate-based e-sign systems with PHP and JavaScript.'
      },
      {
        company: 'Lilyn.ai',
        period: '2022-2026',
        summary:
          'Led planning, system design, AI integration, motion workflow research, and product delivery across virtual idol, AI companion, and trading-assistant products.'
      }
    ],
    contactHeading: 'finger contact',
    contacts: [
      {
        label: 'GITHUB',
        value: 'github.com/realerikk0',
        href: 'https://github.com/realerikk0'
      },
      {
        label: 'X',
        value: 'x.com/helloerikk0',
        href: 'https://x.com/helloerikk0'
      },
      {
        label: 'MAIL',
        value: 'yuanliu325@gmail.com',
        href: 'mailto:yuanliu325@gmail.com'
      }
    ],
    footer: 'Erik Liu / Systems, products, and AI workflows',
    languageToggle: '切换到中文'
  },
  'zh-CN': {
    promptHost: 'visitor@california:~$',
    identity: 'Erik Liu',
    hero: [
      'Freedom through logic.',
      'Structure by design.'
    ],
    about: {
      command: 'cat about.md',
      body:
        '我覆盖前端、后端、基础设施、部署与 AI workflow 的完整链路。技术栈包括 React、Vue、Python、PHP、Node.js、C#、Tauri、CI/CD、云服务、数据系统以及基于 LLM 的产品与多代理工作流。'
    },
    projectHeading: 'tree work/ --depth 1',
    projectSections: [
      {
        key: 'OPENSTRAT',
        href: 'https://openstrat.ai/',
        summary:
          '智能投资助手，覆盖美股与加密货币。我负责架构设计、数据订阅、高频同步、数据清洗、内部回测平台以及高并发 LLM 服务稳定性。'
      },
      {
        key: 'YUME_DESKTOP',
        summary:
          '基于 ASR、记忆系统、TTS、动作生成和 Unreal Engine 的实时 AI 陪伴桌面应用。我负责立项、技术路线、模型训练、系统集成与 Steam 上架。'
      },
      {
        key: 'LEANHUB',
        summary:
          '科幻社区平台，覆盖视频、推荐系统、多端分发、OSS/CDN、Redis、MySQL、ffmpeg 转码链路与生产发布流程。'
      },
      {
        key: 'GEZHI_ESIGN',
        summary:
          '电子合同与电子签平台，支持数字证书、人脸识别与面对面签署。我负责产品设计、架构、全栈开发与部署。'
      }
    ],
    experienceHeading: 'grep timeline experience.log',
    experiences: [
      {
        company: 'Covenate / Lianlu Tech',
        period: '2017-2021',
        summary:
          '参与并交付基于区块链、数字证书能力的电子签署系统，技术栈以 PHP 与 JavaScript 为主。'
      },
      {
        company: 'Lilyn.ai',
        period: '2022-2026',
        summary:
          '主导虚拟偶像、AI 陪伴桌面应用与智能投资助手等产品的规划、系统设计、AI 集成与技术落地。'
      }
    ],
    contactHeading: 'finger contact',
    contacts: [
      {
        label: 'GITHUB',
        value: 'github.com/realerikk0',
        href: 'https://github.com/realerikk0'
      },
      {
        label: 'X',
        value: 'x.com/helloerikk0',
        href: 'https://x.com/helloerikk0'
      },
      {
        label: 'MAIL',
        value: 'yuanliu325@gmail.com',
        href: 'mailto:yuanliu325@gmail.com'
      }
    ],
    footer: 'Erik Liu / 系统、产品与 AI workflow',
    languageToggle: 'Switch to English'
  }
}

function getInitialLocale(): Locale {
  const saved = window.localStorage.getItem(localeKey)
  if (saved === 'zh-CN' || saved === 'en-US') {
    return saved
  }

  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US'
}

function Prompt({ command, host }: { command: string; host: string }) {
  return (
    <div className="prompt-line">
      <span className="prompt-prefix">{host}</span>
      <span>{command}</span>
    </div>
  )
}

function renderPixelLetters(text: string, layer: string) {
  return text.split('').map((char, index) => {
    const glyph = pixelGlyphs[char] ?? pixelGlyphs[' ']
    const width = glyph[0]?.length ?? 0

    return (
      <div
        key={`${layer}-${char}-${index}`}
        className={`pixel-letter${char === ' ' ? ' pixel-letter-space' : ''}`}
        style={{ ['--pixel-columns' as string]: width }}
        aria-hidden="true"
      >
        {glyph.flatMap((row, rowIndex) =>
          row.split('').map((cell, cellIndex) => (
            <span
              key={`${layer}-${rowIndex}-${cellIndex}`}
              className={`pixel-cell${cell === '1' ? ' is-on' : ''}`}
            />
          ))
        )}
      </div>
    )
  })
}

function PixelTitle({ text }: { text: string }) {
  return (
    <div className="pixel-title" aria-label={text} role="img">
      <div className="pixel-layer pixel-layer-outline">{renderPixelLetters(text, 'outline')}</div>
      <div className="pixel-layer pixel-layer-main">{renderPixelLetters(text, 'main')}</div>
    </div>
  )
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())
  const active = copy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(localeKey, locale)
  }, [locale])

  return (
    <main className="terminal-page">
      <div className="background-grid" aria-hidden="true" />

      <div className="terminal-shell">
        <div className="toolbar">
          <Prompt command="ssh erikliu@portfolio" host={active.promptHost} />
          <button
            type="button"
            className="language-switch"
            onClick={() => setLocale((current) => (current === 'zh-CN' ? 'en-US' : 'zh-CN'))}
          >
            {active.languageToggle}
          </button>
        </div>

        <header className="section hero-section">
          <Prompt command="whoami" host={active.promptHost} />
          <div className="section-body hero-stack">
            <PixelTitle text="ERIK LIU" />
            <p className="hero-line">{active.hero[0]}</p>
            <p className="hero-line">{active.hero[1]}</p>
          </div>
        </header>

        <section className="section">
          <Prompt command={active.about.command} host={active.promptHost} />
          <div className="section-body narrow-body">
            <p>{active.about.body}</p>
          </div>
        </section>

        <section className="section">
          <Prompt command={active.projectHeading} host={active.promptHost} />
          <div className="section-body">
            <ol className="tree-list">
              {active.projectSections.map((project, index) => (
                <li key={project.key} className="tree-item" style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="tree-title-row">
                    <span className="tree-glyph">{index === active.projectSections.length - 1 ? '└─' : '├─'}</span>
                    {project.href ? (
                      <a className="tree-link" href={project.href} target="_blank" rel="noreferrer">
                        {project.key}
                      </a>
                    ) : (
                      <span className="tree-link">{project.key}</span>
                    )}
                  </div>
                  <div className="tree-description-row">
                    <span className="tree-glyph">│</span>
                    <p>{project.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <Prompt command={active.experienceHeading} host={active.promptHost} />
          <div className="section-body">
            <ul className="experience-list">
              {active.experiences.map((item) => (
                <li key={`${item.company}-${item.period}`} className="experience-item">
                  <div className="experience-head">
                    <span>{item.company}</span>
                    <span>{item.period}</span>
                  </div>
                  <p>{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact-section">
          <Prompt command={active.contactHeading} host={active.promptHost} />
          <div className="section-body">
            <ul className="contact-list">
              {active.contacts.map((contact) => (
                <li key={contact.label} className="contact-item">
                  <span className="contact-label">{contact.label}</span>
                  <a href={contact.href} target="_blank" rel="noreferrer">
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="terminal-footer">
          <div className="prompt-line">
            <span className="prompt-prefix">{active.promptHost}</span>
            <span className="cursor" aria-hidden="true" />
          </div>
          <p>{active.footer}</p>
        </footer>
      </div>
    </main>
  )
}
