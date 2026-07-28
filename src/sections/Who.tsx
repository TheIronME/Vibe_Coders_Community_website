import { useReveal } from '@/hooks/useReveal'

const ROLES = [
  { icon: '🐣', title: '有想法的小白', desc: '零基础也能参与，你的想法很重要', color: '#22e6ff' },
  { icon: '🥷', title: '有技术的黑客', desc: '写代码、搞算法，技术大佬请就位', color: '#a855f7' },
  { icon: '🎨', title: '产品经理 / 设计师', desc: '产品构思、体验设计，把点子变成好产品', color: '#ff2ea6' },
  { icon: '📣', title: '运营 / 市场 / 创作者', desc: '传播、增长、内容创作，让更多人看见我们', color: '#ffe24a' },
  { icon: '📷', title: '摄影 / 内容记录者', desc: '用镜头和文字记录最真实的共创现场', color: '#7dff6a' },
  { icon: '🤖', title: 'AI 共创玩家', desc: '拥抱新工具，探索 AI × 共创的无限可能', color: '#22e6ff' },
]

/** 适合谁来 —— 六边形角色卡 */
export default function Who() {
  const rootRef = useReveal<HTMLElement>(0.1)

  return (
    <section ref={rootRef} className="relative mx-auto max-w-6xl px-6 py-28">
      <p data-reveal className="font-tech text-center text-sm tracking-[0.5em] text-[#7dff6a]">
        WHO CAN JOIN
      </p>
      <h2 data-reveal className="mt-4 text-center font-display text-4xl sm:text-6xl">
        适合<span className="gradient-text">谁</span>来？
      </h2>
      <p data-reveal className="mx-auto mt-5 max-w-xl text-center text-white/55">
        不管你偏技术、偏创意、偏表达，都可以在这里找到自己的位置。不需要很厉害，只要你有好奇心。
      </p>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((r) => (
          <div
            key={r.title}
            data-reveal
            className="neon-card spotlight group flex items-center gap-5 rounded-2xl p-6"
            style={{ ['--card-glow' as string]: r.color }}
          >
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
              style={{ background: `${r.color}1a`, boxShadow: `inset 0 0 20px ${r.color}33` }}
            >
              {r.icon}
            </div>
            <div>
              <h3 className="font-display text-xl text-white">{r.title}</h3>
              <p className="mt-1 text-sm text-white/55">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p data-reveal className="mt-14 text-center font-display text-2xl text-white/80 sm:text-3xl">
        一起交流，一起学习，一起共创 ——
        <span className="gradient-text">不分黑白，只拼热爱！</span>
      </p>
    </section>
  )
}
