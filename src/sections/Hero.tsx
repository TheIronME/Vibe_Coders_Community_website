import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

const SLOGAN = 'Vibe coders , YES!'

/** 顶部居中 LOGO + 理念 —— Stitch 式极简开场 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const [typed, setTyped] = useState('')

  // 打字机
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setTyped(SLOGAN.slice(0, i))
      if (i >= SLOGAN.length) clearInterval(timer)
    }, 130)
    return () => clearInterval(timer)
  }, [])

  // 入场编排
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          '.hero-logo',
          { scale: 0.6, opacity: 0, filter: 'blur(20px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-bar',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=0.4'
        )
        .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
        .fromTo(
          '.hero-chip',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* 漂浮的几何碎片 */}
      {[
        { c: '#ff2ea6', t: '12%', l: '8%', s: 3, d: 7 },
        { c: '#22e6ff', t: '70%', l: '12%', s: 2, d: 9 },
        { c: '#ffe24a', t: '20%', l: '85%', s: 2.5, d: 8 },
        { c: '#a855f7', t: '75%', l: '88%', s: 3, d: 10 },
        { c: '#7dff6a', t: '45%', l: '92%', s: 2, d: 6 },
        { c: '#22e6ff', t: '60%', l: '5%', s: 1.5, d: 11 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rotate-45 border-2"
          style={{
            top: p.t,
            left: p.l,
            width: `${p.s}rem`,
            height: `${p.s}rem`,
            borderColor: p.c,
            boxShadow: `0 0 18px ${p.c}55`,
          }}
          animate={{ y: [0, -26, 0], rotate: [45, 135, 45], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* 顶部徽章 */}
      <div className="hero-badge mb-8 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur">
        <span className="h-2 w-2 animate-ping rounded-full bg-[#7dff6a]" />
        <span className="font-tech text-sm tracking-[0.3em] text-white/70">
          SHENZHEN · VIBE CODING COMMUNITY
        </span>
      </div>

      {/* 中央 LOGO */}
      <h1
        className="hero-logo glitch font-eng text-center text-[13vw] leading-[0.95] text-white sm:text-[10vw] lg:text-[7.5rem]"
        data-text="VIBE CODERS"
        style={{ textShadow: '0 0 40px rgba(255,46,166,.45), 0 0 90px rgba(34,230,255,.3)' }}
      >
        VIBE CODERS
      </h1>

      {/* 渐变分隔条 */}
      <div className="hero-bar my-7 h-[3px] w-56 origin-center rounded-full bg-gradient-to-r from-[#22e6ff] via-[#ff2ea6] to-[#ffe24a] shadow-[0_0_20px_#ff2ea6aa] sm:w-80" />

      {/* 打字机口号 */}
      <p className="hero-sub font-display text-center text-3xl tracking-wide sm:text-5xl">
        <span className="gradient-text">{typed}</span>
        <span className="type-caret" />
      </p>

      <p className="hero-sub mt-6 max-w-2xl text-center text-base leading-relaxed text-white/60 sm:text-lg">
        这里是深圳最不设限的创造者社区 —— 我们首次提出
        <span className="mx-1 font-bold text-[#22e6ff] neon-text">「灰」客松</span>
        ：在黑客与小白之间，开辟一块能学、能做、能玩、能共创的中间地带。
      </p>

      {/* 精神标签 */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {[
          ['开源', '#22e6ff'],
          ['纯粹', '#ffe24a'],
          ['好玩', '#ff2ea6'],
          ['去中心化', '#7dff6a'],
        ].map(([label, color]) => (
          <span
            key={label}
            className="hero-chip rounded-full border px-5 py-2 font-display text-lg backdrop-blur transition-transform hover:scale-110"
            style={{
              borderColor: `${color}66`,
              color,
              background: `${color}12`,
              textShadow: `0 0 12px ${color}88`,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* 滚动提示 */}
      <div className="hero-scroll absolute bottom-8 flex flex-col items-center gap-2 text-white/50">
        <span className="font-tech text-xs tracking-[0.4em]">SCROLL</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="scroll-dot h-2 w-2 rounded-full bg-[#22e6ff] shadow-[0_0_8px_#22e6ff]" />
        </div>
      </div>
    </section>
  )
}
