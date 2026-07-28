import { useEffect, useRef } from 'react'

/** 跟随鼠标的彩色光晕 + 三环霓虹光标 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    if (!glow || !dot) return

    let gx = window.innerWidth / 2
    let gy = window.innerHeight / 2
    let tx = gx
    let ty = gy
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`
    }

    const loop = () => {
      gx += (tx - gx) * 0.08
      gy += (ty - gy) * 0.08
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,46,166,0.7) 0%, rgba(34,230,255,0.45) 45%, transparent 70%)',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-3 w-3 rounded-full border border-cyan-300 shadow-[0_0_12px_#22e6ff] md:block"
      />
    </>
  )
}
