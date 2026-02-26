export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/api/auth')) {
    return
  }

  const sessionUser = useState<{ id: string } | null>('auth-user', () => null)

  if (import.meta.client && sessionUser.value) {
    return to.path === '/login' ? navigateTo('/') : undefined
  }

  const { data: session } = await useFetch<{ user?: { id: string } } | null>('/api/auth/get-session', {
    headers: useRequestHeaders(['cookie']),
  })

  if (session.value?.user) {
    sessionUser.value = session.value.user
    return to.path === '/login' ? navigateTo('/') : undefined
  }

  if (to.path === '/login') return
  return navigateTo('/login')
})
