import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

const SPIRITS = [
  {
    icon: '⌥',
    title: '开源',
    en: 'OPEN SOURCE',
    desc: '开放分享，共建未来。想法不被锁在抽屉里，代码和灵感都属于所有人。',
    color: '#22e6ff',
  },
  {
    icon: '♥',
    title: '纯粹',
    en: 'PURE',
    desc: '没有套路，只为创造。不卷不装，快乐本身就是目的。',
    color: '#ffe24a',
  },
  {
    icon: '☺',
    title: '好玩',
    en: 'FUN',
    desc: '享受过程，快乐共创。酒吧氛围但不装，写点代码，聊点灵感。',
    color: '#ff2ea6',
  },
  {
    icon: '⬡',
    title: '去中心化',
    en: 'DECENTRALIZED',
    desc: '自由协作，人人平等。没有主办方的高台，只有围成一圈的伙伴。',
    color: '#7dff6a',
  },
]

/** 我们的精神 —— 3D 倾斜 + 鼠标追光卡片 */
export default function Spirit() {
  const rootRef = useReveal<HTMLElement>(0.15)
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const el = tiltRefs.current[i]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    const rx = ((y / rect.height) - 0.5) * -12
    const ry = ((x / rect.width) - 0.5) * 12
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
  }

  const handleLeave = (i: number) => {
    const el = tiltRefs.current[i]
    if (el) el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section ref={rootRef} className="relative mx-auto max-w-6xl px-6 py-28">
      <p data-reveal className="font-tech text-center text-sm tracking-[0.5em] text-[#22e6ff]">
        OUR SPIRIT
      </p>
      <h2 data-reveal className="mt-4 text-center font-display text-4xl sm:text-6xl">
        我们的<span className="gradient-text">精神</span>
      </h2>
      <p data-reveal className="mx-auto mt-5 max-w-xl text-center text-white/55">
        这个世界总有一群人，不愿意安于现状。我们是 AI Native 一代 —— AI 时代，改变世界的人，不再是拿着传统光环的人。
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPIRITS.map((s, i) => (
          <div
            key={s.title}
            data-reveal
            ref={(el) => {
              tiltRefs.current[i] = el
            }}
            onMouseMove={(e) => handleMove(e, i)}
            onMouseLeave={() => handleLeave(i)}
            className="neon-card spotlight rounded-2xl p-7 will-change-transform"
            style={{ ['--card-glow' as string]: s.color, transition: 'transform .25s ease, border-color .35s, box-shadow .35s' }}
          >
            <div
              className="font-display text-5xl"
              style={{ color: s.color, textShadow: `0 0 24px ${s.color}` }}
            >
              {s.icon}
            </div>
            <h3 className="mt-5 font-display text-2xl" style={{ color: s.color }}>
              {s.title}
            </h3>
            <p className="font-tech mt-1 text-xs tracking-[0.3em] text-white/40">{s.en}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
