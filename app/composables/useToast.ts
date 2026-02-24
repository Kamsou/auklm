const message = ref('')
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  function show(msg: string, duration = 4000) {
    if (timer) clearTimeout(timer)
    message.value = msg
    visible.value = true
    timer = setTimeout(() => {
      visible.value = false
    }, duration)
  }

  function dismiss() {
    if (timer) clearTimeout(timer)
    visible.value = false
  }

  return { message: readonly(message), visible: readonly(visible), show, dismiss }
}
