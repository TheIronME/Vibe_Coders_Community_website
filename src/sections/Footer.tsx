import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/hooks/useReveal'

gsap.registerPlugin(ScrollTrigger)

/** 结尾 CTA —— 巨型口号 + 加入按钮 */
export default function Footer() {
  const revealRef = useReveal<HTMLElement>(0.15)
  const bigRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.55)',
          scrollTrigger: { trigger: bigRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={revealRef} className="relative overflow-hidden px-6 pb-16 pt-28">
      {/* 底部辉光 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(ellipse_at_bottom,rgba(255,46,166,0.22),transparent_65%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p data-reveal className="font-tech text-sm tracking-[0.5em] text-[#22e6ff]">
          JOIN THE VIBE
        </p>
        <h2
          ref={bigRef}
          className="mt-6 font-eng text-[11vw] leading-none text-white sm:text-7xl"
          style={{ textShadow: '0 0 50px rgba(34,230,255,.5), 0 0 100px rgba(255,46,166,.35)' }}
        >
          VIBE CODERS,
          <br />
          <span className="gradient-text">YES!</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-lg text-white/60">
          来这里，认识新朋友，一起从 0 到 1 造点东西。
          带上想法，来就对了 —— 每个人都能参与，每个想法都值得被实现。
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="btn-neon rounded-full bg-gradient-to-r from-[#22e6ff] to-[#ff2ea6] px-10 py-4 font-display text-xl text-[#050208]"
          >
            报名下一局灰客松
          </a>
          <a
            href="#"
            className="btn-neon rounded-full border border-[#ffe24a]/60 px-10 py-4 font-display text-xl text-[#ffe24a]"
          >
            加入社区群聊
          </a>
        </div>

        <div data-reveal className="mt-20 border-t border-white/10 pt-8 text-sm text-white/35">
          <p className="font-tech tracking-[0.3em]">SHENZHEN · VIBE CODERS COMMUNITY</p>
          <p className="mt-2 font-display text-white/45">
            开源 · 纯粹 · 好玩 · 去中心化 —— 为爱发电 ♥
          </p>
        </div>
      </div>
    </footer>
  )
}
