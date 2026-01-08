import { notFound } from 'next/navigation'
import { Poems } from '@/data/poems'

/**
 * 详情页：根据 number 展示单首诗歌详情
 */
/**
 * 详情页：根据 number 展示单首诗歌详情
 */
export default async function Page({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  const id = Number(number)
  const poem = Poems.find(p => p.number === id)
  if (!poem) return notFound()
  return (
    <main className="mx-auto max-w-3xl p-6">
      <article>
        <div className="w-full">
          <img src={poem.image} alt={poem.name} className="w-full h-auto" />
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">长按可保存图片</p>
        {poem.author && <p className="mt-2 text-sm text-gray-600">作者：{poem.author}</p>}
        {poem.audio && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={poem.audio} />
            </audio>
          </div>
        )}
        {poem.text && <p className="mt-6 text-base text-gray-800 whitespace-pre-line">{poem.text}</p>}
        {poem.description && <p className="mt-4 text-sm text-gray-700">{poem.description}</p>}
      </article>
    </main>
  )
}

/**
 * 生成静态参数，避免构建后动态路由 404
 */
export function generateStaticParams() {
  return Poems.map(p => ({ number: String(p.number) }))
}