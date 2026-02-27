<script setup lang="ts">
definePageMeta({
  layout: false,
  pageTransition: false,
})

type Step = 'welcome' | 'remember' | 'date-picker' | 'no-worries' | 'ready'

const step = ref<Step>('welcome')
const selectedDate = ref('')
const { toggleDate } = useCycle()
const { markDone } = useOnboarding()

const today = getToday()

function getToday(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

async function saveDate() {
  if (!selectedDate.value) return
  await toggleDate(selectedDate.value)
  step.value = 'ready'
}

function finish() {
  markDone()
  navigateTo('/')
}
</script>

<template>
  <div class="onboarding">
    <div class="onboarding__bg">
      <div class="onboarding__blob onboarding__blob--1" />
      <div class="onboarding__blob onboarding__blob--2" />
      <div class="onboarding__blob onboarding__blob--3" />
    </div>

    <Transition name="step" mode="out-in">
      <!-- Welcome -->
      <div v-if="step === 'welcome'" key="welcome" class="onboarding__step">
        <GouttyMascot mood="wave" :size="150" />
        <h2 class="onboarding__title">Salut !</h2>
        <p class="onboarding__text">
          Je suis <strong>Goutty</strong>, ta compagne de cycle
        </p>
        <button class="onboarding__btn onboarding__btn--primary" @click="step = 'remember'">
          Suivant
        </button>
      </div>

      <!-- Remember -->
      <div v-else-if="step === 'remember'" key="remember" class="onboarding__step">
        <GouttyMascot mood="idle" :size="120" />
        <p class="onboarding__text">
          Est-ce que tu te souviens de la date de tes <strong>dernieres regles</strong> ?
        </p>
        <div class="onboarding__choices">
          <button class="onboarding__btn onboarding__btn--primary" @click="step = 'date-picker'">
            Oui
          </button>
          <button class="onboarding__btn onboarding__btn--secondary" @click="step = 'no-worries'">
            Non
          </button>
        </div>
      </div>

      <!-- Date picker -->
      <div v-else-if="step === 'date-picker'" key="date-picker" class="onboarding__step">
        <GouttyMascot mood="celebrate" :size="120" />
        <p class="onboarding__text">Super ! Selectionne la date</p>
        <input
          v-model="selectedDate"
          type="date"
          :max="today"
          class="onboarding__date-input"
        />
        <button
          class="onboarding__btn onboarding__btn--primary"
          :disabled="!selectedDate"
          @click="saveDate"
        >
          Valider
        </button>
      </div>

      <!-- No worries -->
      <div v-else-if="step === 'no-worries'" key="no-worries" class="onboarding__step">
        <GouttyMascot mood="reassure" :size="120" />
        <p class="onboarding__text">
          Pas de souci !<br>Note-les quand tu t'en souviendras
        </p>
        <button class="onboarding__btn onboarding__btn--primary" @click="step = 'ready'">
          Compris
        </button>
      </div>

      <!-- Ready -->
      <div v-else key="ready" class="onboarding__step">
        <GouttyMascot mood="celebrate" :size="150" />
        <h2 class="onboarding__title">C'est parti !</h2>
        <button class="onboarding__btn onboarding__btn--primary" @click="finish">
          Commencer
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.onboarding {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: #f4eff9;
  overflow: hidden;
}

.onboarding__bg {
  position: absolute;
  inset: -30%;
  filter: blur(40px);
}

.onboarding__blob {
  position: absolute;
  border-radius: 50%;
}

.onboarding__blob--1 {
  width: 70vw;
  height: 70vw;
  max-width: 500px;
  max-height: 500px;
  top: -20%;
  left: -15%;
  background: radial-gradient(circle, rgba(210, 80, 120, 0.45) 0%, transparent 60%);
  animation: drift1 20s ease-in-out infinite alternate;
}

.onboarding__blob--2 {
  width: 60vw;
  height: 60vw;
  max-width: 450px;
  max-height: 450px;
  bottom: -15%;
  right: -10%;
  background: radial-gradient(circle, rgba(140, 90, 200, 0.4) 0%, transparent 60%);
  animation: drift2 24s ease-in-out infinite alternate;
}

.onboarding__blob--3 {
  width: 50vw;
  height: 50vw;
  max-width: 380px;
  max-height: 380px;
  top: 50%;
  left: 30%;
  background: radial-gradient(circle, rgba(200, 70, 100, 0.25) 0%, transparent 55%);
  animation: drift3 18s ease-in-out infinite alternate;
}

.onboarding__step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-5);
  width: 100%;
  max-width: 320px;
}

.onboarding__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 7vw, 2.5rem);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
}

.onboarding__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.onboarding__text strong {
  color: var(--color-text-primary);
  font-weight: var(--weight-semi);
}

.onboarding__choices {
  display: flex;
  gap: var(--space-3);
  width: 100%;
}

.onboarding__choices .onboarding__btn {
  flex: 1;
}

.onboarding__btn {
  width: 100%;
  padding: var(--space-4);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: var(--weight-semi);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.onboarding__btn:active {
  transform: scale(0.97);
  opacity: 0.9;
}

.onboarding__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.onboarding__btn--primary {
  color: white;
  background: var(--gradient-accent);
  box-shadow: 0 4px 16px rgba(107, 91, 149, 0.25);
}

.onboarding__btn--secondary {
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(107, 91, 149, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.onboarding__date-input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(120, 90, 170, 0.15);
  border-radius: var(--radius-md);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.onboarding__date-input:focus {
  border-color: rgba(120, 90, 170, 0.35);
  box-shadow: 0 0 0 3px rgba(107, 91, 149, 0.08);
}

.step-enter-active {
  transition: opacity 0.3s var(--ease-out),
              transform 0.3s var(--ease-out);
}

.step-leave-active {
  transition: opacity 0.15s ease-in,
              transform 0.15s ease-in;
}

.step-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.step-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes drift1 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(8vw, 6vh) scale(1.1); }
}

@keyframes drift2 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-6vw, -8vh) scale(1.15); }
}

@keyframes drift3 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-5vw, 5vh) scale(0.9); }
}
</style>
