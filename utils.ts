export function formatNumber(number: number) { return Intl.NumberFormat('en', { notation: 'compact' }).format(number) }

export function getHue(str: string, s = 40, l = 30) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash)
  }
  const h = Math.abs(hash) % 360
  return `hsl(${h}, ${s}%, ${l}%)`
}