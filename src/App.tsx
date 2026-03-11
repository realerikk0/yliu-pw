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
  gatewayHost: string
  shellHost: string
  hero: string[]
  about: CommandSection
  projectHeading: string
  projectSections: Project[]
  experienceHeading: string
  experiences: Experience[]
  contactHeading: string
  contacts: Contact[]
  footer: string
}

type SectionId = 'hero' | 'about' | 'projects' | 'experience' | 'contact'

type StepId = 'ssh' | SectionId

type SequenceStep = {
  id: StepId
  host: string
  command: string
  section?: SectionId
  leadDelay: number
  typeSpeed: number
  settleDelay: number
  revealDelay: number
}

const localeKey = 'site-locale'
const loginCommand = 'ssh erikk0@portfolio'
const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'en-US', label: 'en_US' },
  { value: 'zh-CN', label: 'zh_CN' }
]
const initialSections: Record<SectionId, boolean> = {
  hero: false,
  about: false,
  projects: false,
  experience: false,
  contact: false
}

const pixelGlyphs: Record<string, string[]> = {
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  R: ['111110', '100011', '100011', '111110', '101100', '100110', '100011'],
  I: ['111', '010', '010', '010', '010', '010', '111'],
  K: ['100011', '100110', '101100', '111000', '101100', '100110', '100011'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '11111'],
  ' ': ['00', '00', '00', '00', '00', '00', '00']
}

const copy: Record<Locale, Copy> = {
  'en-US': {
    gatewayHost: 'anonymous@mainframe:~$',
    shellHost: 'erikk0@portfolio:~$',
    hero: ['Freedom through logic.', 'Structure by design.'],
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
        key: 'COVENATE UNFRAUDABLE ESIGN',
        summary:
          'Digital contract and e-sign platform with certificates, face verification, and in-person signing. I handled product design, architecture, full-stack development, and deployment.'
      }
    ],
    experienceHeading: 'grep timeline experience.log',
    experiences: [
      {
        company: 'Covenate',
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
        value: 'erik@yliu.pw',
        href: 'mailto:erik@yliu.pw'
      }
    ],
    footer: 'Erik Liu / Systems, products, and AI workflows'
  },
  'zh-CN': {
    gatewayHost: 'anonymous@mainframe:~$',
    shellHost: 'erikk0@portfolio:~$',
    hero: ['Freedom through logic.', 'Structure by design.'],
    about: {
      command: 'cat about.md',
      body:
        '我覆盖前端、后端、基础设施、部署与 AI workflow 的完整链路。技术栈包括 React、Vue、Python、PHP、Node.js、C#、Tauri、CI/CD、云服务、数据系统，以及基于 LLM 的产品与多代理工作流。'
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
        key: '梦珑桌面',
        summary:
          '基于 ASR、记忆系统、TTS、动作生成和 Unreal Engine 的实时 AI 陪伴桌面应用。我负责立项、技术路线、模型训练、系统集成与 Steam 上架。'
      },
      {
        key: '零号社区',
        summary:
          '科幻社区平台，覆盖视频、推荐系统、多端分发、OSS/CDN、Redis、MySQL、ffmpeg 转码链路与生产发布流程。'
      },
      {
        key: '鸽纸电签',
        summary:
          '电子合同与电子签平台，支持数字证书、人脸识别与面对面签署。我负责产品设计、架构、全栈开发与部署。'
      }
    ],
    experienceHeading: 'grep timeline experience.log',
    experiences: [
      {
        company: 'Covenate',
        period: '2017-2021',
        summary: '参与并交付基于区块链、数字证书能力的电子签署系统，技术栈以 PHP 与 JavaScript 为主。'
      },
      {
        company: 'Lilyn.ai',
        period: '2022-2026',
        summary: '主导虚拟偶像、AI 陪伴桌面应用与智能投资助手等产品的规划、系统设计、AI 集成与技术落地。'
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
        value: 'erik@yliu.pw',
        href: 'mailto:erik@yliu.pw'
      }
    ],
    footer: 'Erik Liu / 系统、产品与 AI workflow'
  }
}

function getInitialLocale(): Locale {
  const saved = window.localStorage.getItem(localeKey)
  if (saved === 'zh-CN' || saved === 'en-US') {
    return saved
  }

  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US'
}

function TerminalPrompt({
  command,
  host,
  typedLength,
  isActive
}: {
  command: string
  host: string
  typedLength: number
  isActive: boolean
}) {
  return (
    <div className="prompt-line prompt-line-live">
      <span className="prompt-prefix">{host}</span>
      <span>{command.slice(0, typedLength)}</span>
      {isActive ? <span className="cursor" aria-hidden="true" /> : null}
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
  const [activeStep, setActiveStep] = useState<StepId | null>(null)
  const [typedCounts, setTypedCounts] = useState<Partial<Record<StepId, number>>>({})
  const [revealedSections, setRevealedSections] = useState<Record<SectionId, boolean>>(() => ({
    ...initialSections
  }))
  const [sequenceDone, setSequenceDone] = useState(false)
  const active = copy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(localeKey, locale)
  }, [locale])

  useEffect(() => {
    const steps: SequenceStep[] = [
      {
        id: 'ssh',
        host: active.gatewayHost,
        command: loginCommand,
        leadDelay: 1100,
        typeSpeed: 72,
        settleDelay: 420,
        revealDelay: 820
      },
      {
        id: 'hero',
        host: active.shellHost,
        command: 'whoami',
        section: 'hero',
        leadDelay: 220,
        typeSpeed: 78,
        settleDelay: 260,
        revealDelay: 680
      },
      {
        id: 'about',
        host: active.shellHost,
        command: active.about.command,
        section: 'about',
        leadDelay: 180,
        typeSpeed: 48,
        settleDelay: 220,
        revealDelay: 520
      },
      {
        id: 'projects',
        host: active.shellHost,
        command: active.projectHeading,
        section: 'projects',
        leadDelay: 180,
        typeSpeed: 30,
        settleDelay: 260,
        revealDelay: 640
      },
      {
        id: 'experience',
        host: active.shellHost,
        command: active.experienceHeading,
        section: 'experience',
        leadDelay: 180,
        typeSpeed: 34,
        settleDelay: 260,
        revealDelay: 620
      },
      {
        id: 'contact',
        host: active.shellHost,
        command: active.contactHeading,
        section: 'contact',
        leadDelay: 180,
        typeSpeed: 44,
        settleDelay: 220,
        revealDelay: 520
      }
    ]
    const timerIds: number[] = []
    let cancelled = false

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timerId = window.setTimeout(resolve, ms)
        timerIds.push(timerId)
      })

    const queueScroll = () => {
      const timerId = window.setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }, 40)

      timerIds.push(timerId)
    }

    const runSequence = async () => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setActiveStep(null)
      setTypedCounts({})
      setRevealedSections({ ...initialSections })
      setSequenceDone(false)

      for (const step of steps) {
        if (cancelled) {
          return
        }

        setActiveStep(step.id)
        setTypedCounts((current) => ({
          ...current,
          [step.id]: 0
        }))
        queueScroll()

        await wait(step.leadDelay)

        for (let typedLength = 1; typedLength <= step.command.length; typedLength += 1) {
          if (cancelled) {
            return
          }

          setTypedCounts((current) => ({
            ...current,
            [step.id]: typedLength
          }))
          await wait(step.typeSpeed)
        }

        await wait(step.settleDelay)

        if (step.section) {
          const sectionId = step.section

          setRevealedSections((current) => ({
            ...current,
            [sectionId]: true
          }))
          queueScroll()
        }

        await wait(step.revealDelay)
      }

      if (cancelled) {
        return
      }

      setActiveStep(null)
      setSequenceDone(true)
      queueScroll()
    }

    void runSequence()

    return () => {
      cancelled = true
      timerIds.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [locale])

  const hasStarted = (stepId: StepId) => typedCounts[stepId] !== undefined

  return (
    <main className="terminal-page">
      <div className="background-grid" aria-hidden="true" />

      <div className="terminal-shell">
        <div className="toolbar">
          <TerminalPrompt
            command={loginCommand}
            host={active.gatewayHost}
            typedLength={typedCounts.ssh ?? 0}
            isActive={activeStep === 'ssh'}
          />
          <div className="locale-switch" role="group" aria-label="Language selector">
            <span className="locale-label">locale</span>
            {localeOptions.map((option) => {
              const isActive = locale === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`locale-option${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setLocale(option.value)}
                >
                  [{option.label}]
                </button>
              )
            })}
          </div>
        </div>

        {hasStarted('hero') ? (
          <header className="section hero-section">
            <TerminalPrompt
              command="whoami"
              host={active.shellHost}
              typedLength={typedCounts.hero ?? 0}
              isActive={activeStep === 'hero'}
            />
            {revealedSections.hero ? (
              <div className="section-body hero-stack terminal-output">
                <PixelTitle text="ERIK LIU" />
                <p className="hero-line">{active.hero[0]}</p>
                <p className="hero-line">{active.hero[1]}</p>
              </div>
            ) : null}
          </header>
        ) : null}

        {hasStarted('about') ? (
          <section className="section">
            <TerminalPrompt
              command={active.about.command}
              host={active.shellHost}
              typedLength={typedCounts.about ?? 0}
              isActive={activeStep === 'about'}
            />
            {revealedSections.about ? (
              <div className="section-body narrow-body terminal-output">
                <p>{active.about.body}</p>
              </div>
            ) : null}
          </section>
        ) : null}

        {hasStarted('projects') ? (
          <section className="section">
            <TerminalPrompt
              command={active.projectHeading}
              host={active.shellHost}
              typedLength={typedCounts.projects ?? 0}
              isActive={activeStep === 'projects'}
            />
            {revealedSections.projects ? (
              <div className="section-body terminal-output">
                <ol className="tree-list">
                  {active.projectSections.map((project, index) => (
                    <li key={project.key} className="tree-item" style={{ animationDelay: `${index * 90}ms` }}>
                      <div className="tree-title-row">
                        <span className="tree-glyph">
                          {index === active.projectSections.length - 1 ? '└─' : '├─'}
                        </span>
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
            ) : null}
          </section>
        ) : null}

        {hasStarted('experience') ? (
          <section className="section">
            <TerminalPrompt
              command={active.experienceHeading}
              host={active.shellHost}
              typedLength={typedCounts.experience ?? 0}
              isActive={activeStep === 'experience'}
            />
            {revealedSections.experience ? (
              <div className="section-body terminal-output">
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
            ) : null}
          </section>
        ) : null}

        {hasStarted('contact') ? (
          <section className="section contact-section">
            <TerminalPrompt
              command={active.contactHeading}
              host={active.shellHost}
              typedLength={typedCounts.contact ?? 0}
              isActive={activeStep === 'contact'}
            />
            {revealedSections.contact ? (
              <div className="section-body terminal-output">
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
            ) : null}
          </section>
        ) : null}

        {sequenceDone ? (
          <footer className="terminal-footer terminal-output">
            <div className="prompt-line prompt-line-live">
              <span className="prompt-prefix">{active.shellHost}</span>
              <span className="cursor" aria-hidden="true" />
            </div>
            <p>{active.footer}</p>
          </footer>
        ) : null}
      </div>
    </main>
  )
}
