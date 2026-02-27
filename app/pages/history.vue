<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="history-page">
    <h1 class="history-page__title">Historique</h1>
    <div class="history-page__content">
      <CycleHistory />
    </div>
  </div>
</template>

<style scoped>
.history-page {
  padding-top: calc(var(--safe-area-top) + var(--space-5));
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.history-page__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
  flex-shrink: 0;
}

.history-page__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.history-page__content::-webkit-scrollbar {
  display: none;
}
</style>
