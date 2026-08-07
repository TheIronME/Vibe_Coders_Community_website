import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/hooks/useReveal'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    img: '/posters/6-27活动.JPG',
    vol: 'LIVE',
    title: '线下 Vibe Coding 共创局 · 6月场',
    desc: '首场线下活动，Vibe Coders 正式集结，面对面碰撞灵感。',
    date: '2025.06.27',
    color: '#22e6ff',
  },
  {
    img: '/posters/7-18活动.JPG',
    vol: 'LIVE',
    title: '线下 Vibe Coding 共创局 · 7月场',
    desc: '第二场线下共创，更多伙伴加入，更多作品诞生。',
    date: '2025.07.18',
    color: '#ff2ea6',
  },
  {
    img: '/posters/7-25华桥城.jpg',
    vol: 'LIVE',
    title: '华桥城线下共创活动',
    desc: '华桥城站 · 现场 Vibe Coding 实战，脑洞全开。',
    date: '2025.07.25',
    color: '#a855f7',
  },
  {
    img: '/posters/7-25福田.jpg',
    vol: 'LIVE',
    title: '福田线下共创活动',
    desc: '福田站 · 持续碰创，每次都有新作品出炉。',
    date: '2025.07.25',
    color: '#ffe24a',
  },
  {
    img: '/posters/gray1.jpg',
    vol: 'VOL.01',
    title: '灰客松 · 线下 Vibe Coding 共创局',
    desc: '小白 × 黑客，一起造点酷的。不喝酒也能微醺，写点代码，聊点灵感。',
    color: '#ff2ea6',
  },
  {
    img: '/posters/gray2.jpg',
    vol: 'SPECIAL',
    title: '为什么叫「灰」客松 · 理念发布',
    desc: '黑与白之间，才会形成灰客松。能学、能做、能玩、能共创。',
    color: '#a855f7',
  },
  {
    img: '/posters/gray3.jpg',
    vol: 'VOL.02',
    title: '来了可以做什么 · 一日共创营',
    desc: '上午认知破冰、下午创造高峰、晚上融合庆祝，把脑洞变成作品。',
    color: '#22e6ff',
  },
  {
    img: '/posters/gray4.jpg',
    vol: 'OPEN DAY',
    title: '适合谁参加 · 全员招募场',
    desc: '不分黑白，只拼热爱。PM、设计师、运营、摄影、AI 玩家全都有位置。',
    color: '#ffe24a',
  },
  {
    img: '/posters/event-photo.jpg',
    vol: 'LIVE',
    title: 'Vibe Coders 首场线下分享会',
    desc: '极客 · 社交 · 共创 · Casual · 活力 · 热血 —— AI Native 一代的第一次集结。',
    color: '#7dff6a',
  },
]

const SCHEDULE = [
  {
    time: '10:00 – 12:30',
    phase: '上午 · 认知破冰',
    items: ['破冰认识：找到同频的小伙伴', '灵感交流：聊想法、看作品', '自由组队：组建你的梦之队'],
    icon: '☀',
    color: '#ffe24a',
  },
  {
    time: '13:30 – 18:00',
    phase: '下午 · 创造高峰',
    items: ['点子实验室：头脑风暴起飞', 'AI 辅助共创：激发灵感加速实现', '快速做出原型：想法变成看得见的作品'],
    icon: '⚡',
    color: '#ff2ea6',
  },
  {
    time: '19:00 – 22:00',
    phase: '晚上 · 融合庆祝',
    items: ['故事表达：用演示讲述你的作品', '成果展示 + 即兴分享', '拍照记录 · 举杯庆祝我们的创造力'],
    icon: '☾',
    color: '#22e6ff',
  },
]

/** 赛事区 —— GSAP 横向滚动海报长廊 + 一天流程时间轴 */
export default function Events() {
  const revealRef = useReveal<HTMLElement>(0.12)
  const hWrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // 横向滚动：钉住 section，垂直滚动驱动横移
  useEffect(() => {
    const wrap = hWrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={revealRef} className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p data-reveal className="font-tech text-center text-sm tracking-[0.5em] text-[#ffe24a]">
          OUR EVENTS
        </p>
        <h2 data-reveal className="mt-4 text-center font-display text-4xl sm:text-6xl">
          我们办过的<span className="gradient-text">局</span>
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-lg text-center text-white/55">
          每一场都不设门槛：提出问题、找到队友、把想法变成真实作品。继续往下滚，海报长廊会横着走。
        </p>
      </div>

      {/* 横向海报长廊 */}
      <div ref={hWrapRef} className="mt-16 overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center gap-8 px-[8vw]">
          {EVENTS.map((e) => (
            <div key={e.title} className="group w-[78vw] shrink-0 sm:w-[26rem]">
              <div
                className="poster-frame overflow-hidden rounded-2xl"
                style={{ ['--neon-pink' as string]: e.color }}
              >
                <img
                  src={e.img}
                  alt={e.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {e.date && (
                <p className="mt-3 text-center font-tech text-xs tracking-[0.2em] text-white/45">
                  {e.date}
                </p>
              )}
              <div className="mt-5 flex items-start gap-3">
                <span
                  className="mt-1 shrink-0 rounded-md px-2.5 py-1 font-tech text-xs font-bold tracking-widest"
                  style={{ background: e.color, color: '#050208', boxShadow: `0 0 16px ${e.color}88` }}
                >
                  {e.vol}
                </span>
                <div>
                  <h3 className="font-display text-xl text-white">{e.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{e.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {/* 末尾占位卡 */}
          <div className="flex w-[60vw] shrink-0 items-center justify-center sm:w-[26rem]">
            <p className="font-display text-center text-3xl leading-relaxed text-white/70">
              下一局，
              <br />
              <span className="gradient-text text-4xl">等你来开。</span>
            </p>
          </div>
        </div>
      </div>

      {/* 一天流程时间轴 */}
      <div className="mx-auto mt-28 max-w-5xl px-6">
        <h3 data-reveal className="text-center font-display text-3xl sm:text-4xl">
          一场灰客松的<span className="text-[#22e6ff] neon-text">一天</span>
        </h3>
        <div className="relative mt-14">
          <div className="timeline-line absolute left-[19px] top-0 h-full w-[3px] rounded-full sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-12">
            {SCHEDULE.map((s, i) => (
              <div
                key={s.phase}
                data-reveal
                className={`relative flex flex-col gap-4 pl-14 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0 ? 'sm:pr-14 sm:text-right' : 'sm:ml-auto sm:pl-14'
                }`}
              >
                <span
                  className={`absolute left-2 top-0 flex h-9 w-9 items-center justify-center rounded-full font-display text-lg sm:left-auto ${
                    i % 2 === 0 ? 'sm:-right-[18px]' : 'sm:-left-[18px]'
                  }`}
                  style={{ background: s.color, color: '#050208', boxShadow: `0 0 20px ${s.color}` }}
                >
                  {s.icon}
                </span>
                <div
                  className="neon-card rounded-2xl p-6"
                  style={{ ['--card-glow' as string]: s.color }}
                >
                  <p className="font-tech text-xs tracking-[0.3em]" style={{ color: s.color }}>
                    {s.time}
                  </p>
                  <h4 className="mt-2 font-display text-2xl text-white">{s.phase}</h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/60">
                    {s.items.map((it) => (
                      <li key={it}>
                        <span style={{ color: s.color }}>▸ </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
