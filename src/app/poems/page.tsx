import { Poems } from '@/data/poems'
import { PoemCard } from '@/components/PoemCard'

/**
 * 列表页：仅栅格卡片展示（PC 三列 / 移动一列）
 */
export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Poems.map(p => (
          <PoemCard key={p.number} poem={p} variant="list" />
        ))}
      </section>
    </main>
  )
}