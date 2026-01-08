import Link from 'next/link'
import { Poem } from '@/types/poem'

type Variant = 'list' | 'search' | 'detail'

/**
 * 诗歌卡片：从上到下布局（图片、名称、文本），根据 variant 控制内容
 */
export function PoemCard({ poem, variant = 'list', query }: { poem: Poem; variant?: Variant; query?: string }) {
  const text = poem.text || ''
  const q = (query || '').trim()

  /**
   * 生成高亮片段：返回带有关键字前后上下文的数组节点
   */
  function renderHighlightedSnippet(src: string, keyword: string, ctx = 28) {
    const k = keyword.trim()
    if (!k) return src
    const i = src.toLowerCase().indexOf(k.toLowerCase())
    if (i < 0) return src
    const start = Math.max(0, i - ctx)
    const end = Math.min(src.length, i + k.length + ctx)
    const before = src.slice(start, i)
    const match = src.slice(i, i + k.length)
    const after = src.slice(i + k.length, end)
    return (
      <span>
        {start > 0 && '…'}
        {before}
        <mark className="bg-yellow-200 text-black px-0.5 rounded">{match}</mark>
        {after}
        {end < src.length && '…'}
      </span>
    )
  }

  return (
    <Link href={`/poems/${poem.number}`} className="group block">
      <article className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        <div className="h-40 w-full">
          <img src={poem.image} alt={poem.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-3">
          <h3 className="text-base font-semibold tracking-tight">
            {poem.number}. {poem.name}
          </h3>
          <p className="mt-2 text-sm text-gray-700 line-clamp-3">
            {variant === 'search' && q ? renderHighlightedSnippet(text || poem.description || '', q) : (text || poem.description || '')}
          </p>
          {variant === 'detail' && (
            <div className="mt-3 space-y-2">
              {poem.author && <p className="text-xs text-gray-500">作者：{poem.author}</p>}
              {poem.audio && (
                <audio controls className="w-full">
                  <source src={poem.audio} />
                </audio>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}