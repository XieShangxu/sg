import { Poem } from '@/types/poem'

/**
 * 根据输入关键字在诗名、text、description 中进行匹配并返回列表
 */
export function searchPoems(input: string, poems: Poem[]): Poem[] {
  const q = input.trim().toLowerCase()
  if (!q) return []
  return poems.filter(p => {
    const fields = [
      p.name?.toLowerCase() || '',
      p.text?.toLowerCase() || '',
      p.description?.toLowerCase() || ''
    ]
    return fields.some(text => text.includes(q))
  })
}

/**
 * 生成关联提示，优先返回以输入开头的诗名/text/描述中的词
 */
export function suggestTerms(input: string, poems: Poem[], limit = 8): string[] {
  const q = input.trim().toLowerCase()
  if (!q) return []
  const bag = new Set<string>()

  poems.forEach(p => {
    if (p.name && p.name.toLowerCase().startsWith(q)) bag.add(p.name)
    if (p.text) {
      p.text
        .split(/[^\p{L}\p{N}]+/u)
        .filter(Boolean)
        .forEach(w => {
          const lower = w.toLowerCase()
          if (lower.startsWith(q) && w.length > 1) bag.add(w)
        })
    }
    if (p.description) {
      p.description
        .split(/[^\p{L}\p{N}]+/u)
        .filter(Boolean)
        .forEach(w => {
          const lower = w.toLowerCase()
          if (lower.startsWith(q) && w.length > 1) bag.add(w)
        })
    }
  })

  return Array.from(bag).slice(0, limit)
}