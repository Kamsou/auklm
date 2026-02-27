import { eq, and } from 'drizzle-orm'
import { periodDates } from '../../db/schema'

export default defineEventHandler(async (event) => {
  rateLimit(event, { max: 30, windowMs: 60_000 })

  const auth = useAuth()
  const session = await auth.api.getSession({ headers: event.headers })

  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Non authentifie' })
  }

  const body = await readBody<{ date: string }>(event)

  if (!body.date || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    throw createError({ statusCode: 400, statusMessage: 'Format de date invalide (YYYY-MM-DD)' })
  }

  const parts = body.date.split('-').map(Number) as [number, number, number]
  const [y, m, d] = parts
  const parsed = new Date(y, m - 1, d)
  if (isNaN(parsed.getTime()) || parsed.getFullYear() !== y || parsed.getMonth() !== m - 1 || parsed.getDate() !== d) {
    throw createError({ statusCode: 400, statusMessage: 'Date invalide' })
  }

  const today = new Date().toISOString().slice(0, 10)
  if (body.date > today) {
    throw createError({ statusCode: 400, statusMessage: 'Date dans le futur non autorisee' })
  }

  const db = useDb()

  const existing = await db
    .select()
    .from(periodDates)
    .where(and(eq(periodDates.userId, session.user.id), eq(periodDates.date, body.date)))
    .limit(1)

  if (existing.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Date deja enregistree' })
  }

  await db.insert(periodDates).values({
    userId: session.user.id,
    date: body.date,
  })

  return { ok: true }
})
