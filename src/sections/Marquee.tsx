const ITEMS = [
  '不分黑白，只拼热爱',
  'BUILD WITHOUT PERMISSION',
  '为爱发电',
  '想法即代码',
  '小白 × 黑客，一起造点酷的',
  '灰客松 GRAYHACK',
  'AI 助攻 · 从 0 到 1',
  '每个人都能参与，每个想法都值得被实现',
]

/** 双向霓虹跑马灯 */
export default function Marquee() {
  const row = (reverse = false) => (
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span
          key={i}
          className="mx-6 flex shrink-0 items-center gap-6 font-display text-xl tracking-wide text-white/75 sm:text-2xl"
        >
          <span className="text-[#ff2ea6]">✦</span>
          {t}
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative -rotate-1 border-y border-white/10 bg-black/40 py-4 backdrop-blur">
      <div className="overflow-hidden">{row()}</div>
      <div className="mt-2 overflow-hidden opacity-40">{row(true)}</div>
    </div>
  )
}
