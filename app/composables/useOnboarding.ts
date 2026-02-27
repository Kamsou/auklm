const STORAGE_KEY = 'auklm-onboarding-done'

const _done = ref(false)
let _hydrated = false

export function useOnboarding() {
  if (import.meta.client && !_hydrated) {
    _hydrated = true
    _done.value = localStorage.getItem(STORAGE_KEY) === '1'
  }

  const isDone = computed(() => _done.value)

  function markDone() {
    _done.value = true
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, '1')
    }
  }

  return { isDone, markDone }
}
