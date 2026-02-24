import type { H3Event } from 'h3'

const hits = new Map<string, { count: number, resetAt: number }>()

export function rateLimit(event: H3Event, { max = 10, windowMs = 60_000 } = {}) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()

  let entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs }
    hits.set(ip, entry)
  }

  entry.count++

  if (entry.count > max) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de requetes, reessayez plus tard' })
  }
}
