import { useEffect, useMemo } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from '@/components/ParticleField'
import CursorGlow from '@/components/CursorGlow'
import Hero from '@/sections/Hero'
import Marquee from '@/sections/Marquee'
import Spirit from '@/sections/Spirit'
import GrayZone from '@/sections/GrayZone'
import Events from '@/sections/Events'
import Who from '@/sections/Who'
import Footer from '@/sections/Footer'

gsap.registerPlugin(ScrollTrigger)

/** 随机星点 */
function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        color: ['#fff', '#22e6ff', '#ff2ea6', '#ffe24a'][i % 4],
      })),
    []
  )
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            animation: `twinkle ${2.5 + s.delay}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  // Lenis 平滑滚动，并同步 GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="scanlines relative min-h-screen bg-[#050208]">
      <Stars />
      <ParticleField />
      <CursorGlow />
      <main className="relative">
        <Hero />
        <Marquee />
        <Spirit />
        <GrayZone />
        <Events />
        <Who />
        <Footer />
      </main>
    </div>
  )
}
