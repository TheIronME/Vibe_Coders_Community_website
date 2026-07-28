import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 滚动显现：容器内所有 [data-reveal] 元素进入视口时
 * 依次上浮 + 淡入，带 stagger 错落感
 */
export function useReveal<T extends HTMLElement>(stagger = 0.12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('[data-reveal]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 60, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [stagger])

  return ref
}
