'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Poems } from '@/data/poems'
import { searchPoems, suggestTerms } from '@/lib/search'
import { PoemCard } from '@/components/PoemCard'

/**
 * 搜索框组件：输入、关联提示、即时结果展示
 */
export function SearchBox() {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const suggestions = useMemo(() => suggestTerms(q, Poems), [q])
  const results = useMemo(() => searchPoems(q, Poems), [q])

  return (
    <div className="w-full">
      <div className="relative">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const n = Number(q.trim())
              if (Number.isInteger(n) && n >= 1 && n <= Poems.length) {
                router.push(`/poems/${n}`)
              }
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => setFocused(false), 100)
            const n = Number(q.trim())
            if (Number.isInteger(n) && n >= 1 && n <= Poems.length) {
              router.push(`/poems/${n}`)
            }
          }}
          placeholder="输入关键字（诗名 / 正文 / 描述）"
          className="w-full rounded-lg border px-4 py-3 shadow-sm"
        />
        {focused && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
            {suggestions.map(s => (
              <li
                key={s}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                onMouseDown={() => setQ(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {(() => {
        const n = Number(q.trim())
        const valid = Number.isInteger(n) && n >= 1 && n <= Poems.length
        return valid ? (
          <div className="mt-3 text-sm">
            输入编号，已可跳转：
            <button
              className="ml-2 rounded border px-2 py-1 hover:bg-gray-50"
              onClick={() => router.push(`/poems/${Number(q.trim())}`)}
            >
              前往第 {Number(q.trim())} 首
            </button>
          </div>
        ) : null
      })()}

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map(p => (
          <PoemCard key={p.number} poem={p} variant="search" query={q} />
        ))}
      </div>
    </div>
  )
}