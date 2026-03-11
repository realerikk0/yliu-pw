import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

type Locale = 'zh-CN' | 'en-US'

type AppProps = {
  initialLocale?: Locale
}

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
  command: string
  section?: SectionId
  leadDelay: number
  typeSpeed: number
  settleDelay: number
  revealDelay: number
}

type HistoryKind = 'help' | 'about' | 'projects' | 'experience' | 'contact' | 'unknown' | 'rm'

type TerminalHistoryEntry = {
  id: number
  command: string
  kind: HistoryKind
}

type HelpEntry = {
  usage: string
  en: string
  zh: string
}

const loginCommand = 'ssh erikk0@portfolio'
const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'en-US', label: 'en_US' },
  { value: 'zh-CN', label: 'zh_CN' }
]
const localePaths: Record<Locale, string> = {
  'en-US': '/',
  'zh-CN': '/zh/'
}
const initialSections: Record<SectionId, boolean> = {
  hero: false,
  about: false,
  projects: false,
  experience: false,
  contact: false
}
const helpEntries: HelpEntry[] = [
  {
    usage: 'cat [about.md]',
    en: 'Show the profile summary.',
    zh: '显示个人简介。'
  },
  {
    usage: 'tree [work/] [--depth 1]',
    en: 'Show featured projects.',
    zh: '显示代表项目。'
  },
  {
    usage: 'grep [timeline] [experience.log]',
    en: 'Show the experience timeline.',
    zh: '显示工作经历时间线。'
  },
  {
    usage: 'finger [contact]',
    en: 'Show contact details.',
    zh: '显示联系方式。'
  }
]

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
        key: 'COVENATE_UNFRAUDABLE_ESIGN',
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

function isLocale(value?: string): value is Locale {
  return value === 'zh-CN' || value === 'en-US'
}

function resolveLocale(initialLocale?: Locale): Locale {
  if (isLocale(initialLocale)) {
    return initialLocale
  }

  if (typeof document !== 'undefined' && isLocale(document.documentElement.lang)) {
    return document.documentElement.lang
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/zh')) {
    return 'zh-CN'
  }

  return 'en-US'
}

function parseCommand(command: string): HistoryKind {
  const normalized = command.trim().toLowerCase()

  if (normalized === 'help') {
    return 'help'
  }

  if (/^cat(?:\s+about\.md)?$/i.test(normalized)) {
    return 'about'
  }

  if (/^tree(?:\s+work\/?)?(?:\s+--depth\s+1)?$/i.test(normalized)) {
    return 'projects'
  }

  if (/^grep(?:\s+timeline)?(?:\s+experience\.log)?$/i.test(normalized)) {
    return 'experience'
  }

  if (/^finger(?:\s+contact)?$/i.test(normalized)) {
    return 'contact'
  }

  if (/^rm\s+-rf(?:\s+.*)?$/i.test(normalized)) {
    return 'rm'
  }

  return 'unknown'
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

function AboutOutput({ body, locale }: { body: string; locale: Locale }) {
  const heading = locale === 'zh-CN' ? '关于 Erik Liu' : 'About Erik Liu'

  return (
    <div className="section-body narrow-body terminal-output">
      <h2 className="sr-only">{heading}</h2>
      <p>{body}</p>
    </div>
  )
}

function ProjectsOutput({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const heading = locale === 'zh-CN' ? '代表项目' : 'Featured Projects'

  return (
    <div className="section-body terminal-output">
      <h2 className="sr-only">{heading}</h2>
      <ol className="tree-list">
        {projects.map((project, index) => (
          <li key={project.key} className="tree-item" style={{ animationDelay: `${index * 90}ms` }}>
            <div className="tree-title-row">
              <span className="tree-glyph">{index === projects.length - 1 ? '└─' : '├─'}</span>
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
  )
}

function ExperienceOutput({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
  const heading = locale === 'zh-CN' ? '工作经历' : 'Experience Timeline'

  return (
    <div className="section-body terminal-output">
      <h2 className="sr-only">{heading}</h2>
      <ul className="experience-list">
        {experiences.map((item) => (
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
  )
}

function ContactOutput({ contacts, locale }: { contacts: Contact[]; locale: Locale }) {
  const heading = locale === 'zh-CN' ? '联系方式' : 'Contact Details'

  return (
    <div className="section-body terminal-output">
      <h2 className="sr-only">{heading}</h2>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.label} className="contact-item">
            <span className="contact-label">{contact.label}</span>
            <a href={contact.href} target="_blank" rel="noreferrer">
              {contact.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HelpOutput({ locale }: { locale: Locale }) {
  const isChinese = locale === 'zh-CN'

  return (
    <div className="section-body terminal-output">
      <div className="help-panel">
        <p className="help-heading">available commands / 可用命令</p>
        <ul className="help-list">
          {helpEntries.map((entry) => (
            <li key={entry.usage} className="help-item">
              <p className="help-usage">{entry.usage}</p>
              <p className="help-description">
                {entry.en} / {entry.zh}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function UnknownOutput({ command, locale }: { command: string; locale: Locale }) {
  const isChinese = locale === 'zh-CN'

  return (
    <div className="section-body terminal-output">
      <div className="system-message">
        <p>command not found: {command}</p>
        <p>type `help` for available commands / 输入 `help` 查看可用命令</p>
      </div>
    </div>
  )
}

function SingleLocaleHelpOutput({ locale }: { locale: Locale }) {
  const isChinese = locale === 'zh-CN'

  return (
    <div className="section-body terminal-output">
      <div className="help-panel">
        <p className="help-heading">{isChinese ? '可用命令' : 'available commands'}</p>
        <ul className="help-list">
          {helpEntries.map((entry) => (
            <li key={entry.usage} className="help-item">
              <p className="help-usage">{entry.usage}</p>
              <p className="help-description">{isChinese ? entry.zh : entry.en}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SingleLocaleUnknownOutput({ command, locale }: { command: string; locale: Locale }) {
  const isChinese = locale === 'zh-CN'

  return (
    <div className="section-body terminal-output">
      <div className="system-message">
        <p>{isChinese ? `未找到命令：${command}` : `command not found: ${command}`}</p>
        <p>{isChinese ? '输入 `help` 查看可用命令' : 'type `help` for available commands'}</p>
      </div>
    </div>
  )
}

function HistoryOutput({
  entry,
  active,
  locale
}: {
  entry: TerminalHistoryEntry
  active: Copy
  locale: Locale
}) {
  switch (entry.kind) {
    case 'help':
      return <SingleLocaleHelpOutput locale={locale} />
    case 'about':
      return <AboutOutput body={active.about.body} locale={locale} />
    case 'projects':
      return <ProjectsOutput projects={active.projectSections} locale={locale} />
    case 'experience':
      return <ExperienceOutput experiences={active.experiences} locale={locale} />
    case 'contact':
      return <ContactOutput contacts={active.contacts} locale={locale} />
    case 'rm':
      return (
        <div className="section-body terminal-output">
          <div className="system-message system-message-danger">
            <p>portfolio has been deleted.</p>
          </div>
        </div>
      )
    case 'unknown':
      return <SingleLocaleUnknownOutput command={entry.command} locale={locale} />
    default:
      return null
  }
}

export default function App({ initialLocale }: AppProps) {
  const locale = resolveLocale(initialLocale)
  const [activeStep, setActiveStep] = useState<StepId | null>(null)
  const [typedCounts, setTypedCounts] = useState<Partial<Record<StepId, number>>>({})
  const [revealedSections, setRevealedSections] = useState<Record<SectionId, boolean>>(() => ({
    ...initialSections
  }))
  const [sequenceDone, setSequenceDone] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryEntry[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const active = copy[locale]
  const heroHeading =
    locale === 'zh-CN'
      ? 'Erik Liu，全栈工程师，构建系统、产品与 AI 工作流。'
      : 'Erik Liu, full-stack engineer building systems, products, and AI workflows.'

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const steps: SequenceStep[] = [
      {
        id: 'ssh',
        command: loginCommand,
        leadDelay: 1100,
        typeSpeed: 72,
        settleDelay: 420,
        revealDelay: 820
      },
      {
        id: 'hero',
        command: 'whoami',
        section: 'hero',
        leadDelay: 220,
        typeSpeed: 78,
        settleDelay: 260,
        revealDelay: 680
      },
      {
        id: 'about',
        command: active.about.command,
        section: 'about',
        leadDelay: 180,
        typeSpeed: 48,
        settleDelay: 220,
        revealDelay: 520
      },
      {
        id: 'projects',
        command: active.projectHeading,
        section: 'projects',
        leadDelay: 180,
        typeSpeed: 30,
        settleDelay: 260,
        revealDelay: 640
      },
      {
        id: 'experience',
        command: active.experienceHeading,
        section: 'experience',
        leadDelay: 180,
        typeSpeed: 34,
        settleDelay: 260,
        revealDelay: 620
      },
      {
        id: 'contact',
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

    const queueScroll = (behavior: ScrollBehavior = 'smooth') => {
      const timerId = window.setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior
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
      setTerminalInput('')
      setTerminalHistory([])
      setDialogOpen(false)

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
  }, [locale, active.about.command, active.projectHeading, active.experienceHeading, active.contactHeading])

  useEffect(() => {
    if (!sequenceDone || dialogOpen) {
      return
    }

    const timerId = window.setTimeout(() => {
      inputRef.current?.focus()
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      })
    }, 80)

    return () => window.clearTimeout(timerId)
  }, [sequenceDone, terminalHistory, dialogOpen])

  useEffect(() => {
    if (!dialogOpen) {
      return
    }

    const timerId = window.setTimeout(() => {
      window.close()
      if (!window.closed) {
        window.location.replace('about:blank')
      }
    }, 1400)

    return () => window.clearTimeout(timerId)
  }, [dialogOpen])

  const hasStarted = (stepId: StepId) => typedCounts[stepId] !== undefined

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const command = terminalInput.trim()
    if (!command) {
      return
    }

    const kind = parseCommand(command)

    setTerminalHistory((current) => [
      ...current,
      {
        id: Date.now() + current.length,
        command,
        kind
      }
    ])
    setTerminalInput('')

    if (kind === 'rm') {
      setDialogOpen(true)
    }
  }

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
                <a
                  key={option.value}
                  className={`locale-option${isActive ? ' is-active' : ''}`}
                  href={localePaths[option.value]}
                  hrefLang={option.value}
                  aria-current={isActive ? 'page' : undefined}
                >
                  [{option.label}]
                </a>
              )
            })}
          </div>
        </div>

        <header className={`section hero-section terminal-section${hasStarted('hero') ? ' is-started' : ' is-prestart'}`}>
          <div className={`prompt-stage${hasStarted('hero') ? ' is-visible' : ''}`}>
            <TerminalPrompt
              command="whoami"
              host={active.shellHost}
              typedLength={typedCounts.hero ?? 0}
              isActive={activeStep === 'hero'}
            />
          </div>
          <div className={`output-stage${revealedSections.hero ? ' is-revealed' : ''}`}>
            <div className="section-body hero-stack terminal-output">
              <h1 className="sr-only">{heroHeading}</h1>
              <PixelTitle text="ERIK LIU" />
              <p className="hero-line">{active.hero[0]}</p>
              <p className="hero-line">{active.hero[1]}</p>
            </div>
          </div>
        </header>

        <section className={`section terminal-section${hasStarted('about') ? ' is-started' : ' is-prestart'}`}>
          <div className={`prompt-stage${hasStarted('about') ? ' is-visible' : ''}`}>
            <TerminalPrompt
              command={active.about.command}
              host={active.shellHost}
              typedLength={typedCounts.about ?? 0}
              isActive={activeStep === 'about'}
            />
          </div>
          <div className={`output-stage${revealedSections.about ? ' is-revealed' : ''}`}>
            <AboutOutput body={active.about.body} locale={locale} />
          </div>
        </section>

        <section className={`section terminal-section${hasStarted('projects') ? ' is-started' : ' is-prestart'}`}>
          <div className={`prompt-stage${hasStarted('projects') ? ' is-visible' : ''}`}>
            <TerminalPrompt
              command={active.projectHeading}
              host={active.shellHost}
              typedLength={typedCounts.projects ?? 0}
              isActive={activeStep === 'projects'}
            />
          </div>
          <div className={`output-stage${revealedSections.projects ? ' is-revealed' : ''}`}>
            <ProjectsOutput projects={active.projectSections} locale={locale} />
          </div>
        </section>

        <section className={`section terminal-section${hasStarted('experience') ? ' is-started' : ' is-prestart'}`}>
          <div className={`prompt-stage${hasStarted('experience') ? ' is-visible' : ''}`}>
            <TerminalPrompt
              command={active.experienceHeading}
              host={active.shellHost}
              typedLength={typedCounts.experience ?? 0}
              isActive={activeStep === 'experience'}
            />
          </div>
          <div className={`output-stage${revealedSections.experience ? ' is-revealed' : ''}`}>
            <ExperienceOutput experiences={active.experiences} locale={locale} />
          </div>
        </section>

        <section
          className={`section contact-section terminal-section${hasStarted('contact') ? ' is-started' : ' is-prestart'}`}
        >
          <div className={`prompt-stage${hasStarted('contact') ? ' is-visible' : ''}`}>
            <TerminalPrompt
              command={active.contactHeading}
              host={active.shellHost}
              typedLength={typedCounts.contact ?? 0}
              isActive={activeStep === 'contact'}
            />
          </div>
          <div className={`output-stage${revealedSections.contact ? ' is-revealed' : ''}`}>
            <ContactOutput contacts={active.contacts} locale={locale} />
          </div>
        </section>

        {sequenceDone ? (
          <footer className="terminal-footer terminal-output">
            <p className="terminal-signature">{active.footer}</p>

            {terminalHistory.length > 0 ? (
              <div className="terminal-history">
                {terminalHistory.map((entry) => (
                  <div key={entry.id} className="terminal-history-entry">
                    <div className="prompt-line prompt-line-live">
                      <span className="prompt-prefix">{active.shellHost}</span>
                      <span>{entry.command}</span>
                    </div>
                    <HistoryOutput entry={entry} active={active} locale={locale} />
                  </div>
                ))}
              </div>
            ) : null}

            <form className="terminal-input-form" onSubmit={handleTerminalSubmit}>
              <div className="prompt-line prompt-line-live prompt-line-input">
                <span className="prompt-prefix">{active.shellHost}</span>
                <input
                  ref={inputRef}
                  className="terminal-input"
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  disabled={dialogOpen}
                  aria-label="Terminal input"
                />
              </div>
            </form>
          </footer>
        ) : null}
      </div>

      {dialogOpen ? (
        <div className="panic-overlay" role="dialog" aria-modal="true" aria-labelledby="panic-title">
          <div className="panic-dialog">
            <p className="panic-tag">rm -rf</p>
            <h2 id="panic-title">portfolio has been deleted.</h2>
            <p className="panic-caption">closing current session...</p>
          </div>
        </div>
      ) : null}
    </main>
  )
}
