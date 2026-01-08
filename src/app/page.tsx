import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'

/**
 * 首页：搜索框 + 列表入口
 */
export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <SearchBox />
    </main>
  )
}
