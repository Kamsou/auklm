<script setup lang="ts">
const { message, visible, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" class="toast" @click="dismiss">
        <p class="toast__message">{{ message }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: calc(var(--space-5) + var(--safe-area-bottom));
  left: var(--space-5);
  right: var(--space-5);
  max-width: var(--max-width);
  margin: 0 auto;
  z-index: var(--z-overlay);
  background: #1e1a2a;
  color: white;
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.toast__message {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  text-align: center;
}

.toast-enter-active {
  transition: transform var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) var(--ease-out);
}

.toast-leave-active {
  transition: transform var(--duration-fast) ease-in,
              opacity var(--duration-fast) ease-in;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
