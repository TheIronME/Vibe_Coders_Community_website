import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/hooks/useReveal'

gsap.registerPlugin(ScrollTrigger)

const DILEMMAS = [
  { title: '如果全是小白…', desc: '不够好玩，学不到新东西', icon: '🐣', color: '#22e6ff' },
  { title: '如果全是黑客…', desc: '纯技术局门槛太高，小白望而却步', icon: '🥷', color: '#a855f7' },
  { title: '如果只有聊天…', desc: '纯聊天局，又太空', icon: '💬', color: '#ffe24a' },
]

const ABILITIES = [
  { k: '能学', d: '向大佬请教，快速成长', c: '#ffe24a' },
  { k: '能做', d: '把想法变成真实作品', c: '#22e6ff' },
  { k: '能玩', d: '轻松有趣，快乐第一', c: '#7dff6a' },
  { k: '能共创', d: '多元协作，一起造东西', c: '#ff2ea6' },
]

const COMPARE = [
  { dim: '氛围', hack: '严肃竞技，通宵爆肝', gray: '酒吧氛围，微醺写码' },
  { dim: '门槛', hack: '需要硬核技术背景', gray: '零门槛，好奇心即门票' },
  { dim: '组队', hack: '技术栈内卷抱团', gray: '白 + 黑强制混编' },
  { dim: '产出', hack: '拼架构、拼算法', gray: '拼手感、拼脑洞，AI 全程助攻' },
  { dim: '目的', hack: '排名与奖金', gray: '认识新朋友，从 0 到 1 造点东西' },
]

/** 「灰」客松概念区 —— 为什么叫灰客松 + 黑客松对比 */
export default function GrayZone() {
  const revealRef = useReveal<HTMLElement>(0.12)
  const titleRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<'hack' | 'gray'>('gray')

  // 大标题缩放显现
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gray-title',
        { scale: 0.5, opacity: 0, filter: 'blur(16px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: titleRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
    }, titleRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={revealRef} className="relative mx-auto max-w-6xl px-6 py-28">
      <p data-reveal className="font-tech text-center text-sm tracking-[0.5em] text-[#ff2ea6]">
        WHY &quot;GRAY&quot;HACK
      </p>
      <h2 data-reveal className="mt-4 text-center font-display text-4xl sm:text-6xl">
        为什么叫<span className="gradient-text">「灰」客松</span>？
      </h2>

      {/* 三个困境 */}
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {DILEMMAS.map((d) => (
          <div
            key={d.title}
            data-reveal
            className="neon-card relative rounded-2xl p-6 text-center"
            style={{ ['--card-glow' as string]: d.color }}
          >
            <div className="text-4xl">{d.icon}</div>
            <h3 className="mt-3 font-display text-xl text-white/90">{d.title}</h3>
            <p className="mt-2 text-sm text-white/55">{d.desc}</p>
            <span
              className="absolute -right-2 -top-2 flex h-8 w-8 rotate-12 items-center justify-center rounded-full font-display text-lg"
              style={{ background: d.color, color: '#050208', boxShadow: `0 0 16px ${d.color}` }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      {/* 汇聚箭头 */}
      <div data-reveal className="my-8 flex items-center justify-center gap-4">
        <div className="timeline-line h-[3px] w-16 rounded-full sm:w-32" />
        <span className="font-display text-lg text-white/70">黑与白之间</span>
        <div className="timeline-line h-[3px] w-16 rounded-full sm:w-32" />
      </div>

      {/* 灰客松大标题 */}
      <div ref={titleRef} className="text-center">
        <div
          className="gray-title flicker font-display text-[22vw] leading-none sm:text-[10rem]"
          style={{
            background: 'linear-gradient(120deg,#fff 20%,#22e6ff 45%,#ff2ea6 75%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,46,166,.5))',
          }}
        >
          灰客松
        </div>
        <p className="mt-4 text-lg text-white/70">
          灰客松是<span className="text-[#ffe24a]">能学</span>、<span className="text-[#22e6ff]">能做</span>、
          <span className="text-[#7dff6a]">能玩</span>、<span className="text-[#ff2ea6]">能共创</span>的中间地带！
        </p>
      </div>

      {/* 四个能力徽章 */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ABILITIES.map((a) => (
          <div
            key={a.k}
            data-reveal
            className="neon-card rounded-2xl p-5 text-center"
            style={{ ['--card-glow' as string]: a.c }}
          >
            <div className="font-display text-2xl" style={{ color: a.c, textShadow: `0 0 16px ${a.c}88` }}>
              {a.k}
            </div>
            <p className="mt-2 text-sm text-white/60">{a.d}</p>
          </div>
        ))}
      </div>

      {/* 黑客松 vs 灰客松 对比 */}
      <div data-reveal className="mt-20">
        <div className="mx-auto flex w-fit rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
          {(['hack', 'gray'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-full px-6 py-2.5 font-display text-lg transition-all duration-300 ${
                tab === k
                  ? k === 'gray'
                    ? 'bg-gradient-to-r from-[#22e6ff] to-[#ff2ea6] text-[#050208] shadow-[0_0_20px_#ff2ea688]'
                    : 'bg-white/15 text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {k === 'hack' ? '黑客松' : '灰客松'}
            </button>
          ))}
        </div>

        <div className="neon-card mt-6 overflow-hidden rounded-2xl" style={{ ['--card-glow' as string]: '#a855f7' }}>
          <table className="w-full text-left text-sm sm:text-base">
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.dim} className="border-b border-white/8 last:border-0">
                  <td className="w-24 px-5 py-4 font-display text-white/80 sm:w-32">{row.dim}</td>
                  <td className={`px-5 py-4 transition-colors ${tab === 'hack' ? 'text-white' : 'text-white/35'}`}>
                    {row.hack}
                  </td>
                  <td
                    className={`px-5 py-4 transition-colors ${
                      tab === 'gray' ? 'bg-gradient-to-r from-[#22e6ff]/10 to-[#ff2ea6]/10 text-white' : 'text-white/35'
                    }`}
                  >
                    {tab === 'gray' && <span className="mr-2 text-[#ff2ea6]">✦</span>}
                    {row.gray}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center font-display text-lg text-white/60">
          黑客松拼硬核，灰客松拼<span className="gradient-text text-xl">手感</span> —— 更轻松、非技术向、人人都能玩。
        </p>
      </div>
    </section>
  )
}
