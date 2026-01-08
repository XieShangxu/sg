'use client'

import { useMemo, useState } from 'react'
import { Poems } from '@/data/poems'
import { searchPoems, suggestTerms } from '@/lib/search'
import { PoemCard } from '@/components/PoemCard'

/**
 * 搜索框组件：输入、关联提示、即时结果展示
 */
export function SearchBox() {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)

  const suggestions = useMemo(() => suggestTerms(q, Poems), [q])
  const results = useMemo(() => searchPoems(q, Poems), [q])

  return (
    <div className="w-full">
      <div className="relative">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 100)}
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

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map(p => (
          <PoemCard key={p.number} poem={p} variant="search" query={q} />
        ))}
      </div>
    </div>
  )
}