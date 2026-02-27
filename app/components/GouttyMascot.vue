<script setup lang="ts">
defineProps<{
  mood?: 'wave' | 'idle' | 'celebrate' | 'reassure'
  size?: number
}>()
</script>

<template>
  <div
    class="goutty"
    :class="'goutty--' + (mood ?? 'idle')"
    :style="{ width: (size ?? 120) + 'px', height: (size ?? 120) + 'px' }"
  >
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goutty-body" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stop-color="#ff3b4a" />
          <stop offset="100%" stop-color="#b01030" />
        </linearGradient>
      </defs>

      <g class="goutty__bounce">
        <path class="goutty__arm goutty__arm--left" d="M27 66 Q20 58 14 56" stroke="#d42040" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path class="goutty__arm goutty__arm--right" d="M73 66 Q80 58 86 56" stroke="#d42040" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path class="goutty__leg goutty__leg--left" d="M39 93 Q36 104 33 112" stroke="#d42040" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path class="goutty__leg goutty__leg--right" d="M61 93 Q64 104 67 112" stroke="#d42040" stroke-width="5" stroke-linecap="round" fill="none"/>

        <path d="M50 6C50 6 18 44 18 65a32 32 0 1 0 64 0C80 44 50 6 50 6Z" fill="url(#goutty-body)"/>

        <g class="goutty__eyes">
          <circle cx="38" cy="62" r="7" fill="white"/>
          <circle cx="62" cy="62" r="7" fill="white"/>
          <circle cx="39" cy="63" r="3.5" fill="#1e1a2a"/>
          <circle cx="63" cy="63" r="3.5" fill="#1e1a2a"/>
          <circle cx="37.5" cy="61" r="1.5" fill="white"/>
          <circle cx="61.5" cy="61" r="1.5" fill="white"/>
          <ellipse class="goutty__blink" cx="38" cy="62" rx="7.5" ry="0" fill="#c41030"/>
          <ellipse class="goutty__blink" cx="62" cy="62" rx="7.5" ry="0" fill="#c41030"/>
        </g>

        <path class="goutty__mouth" d="M44 75 Q50 80 56 75" stroke="#1e1a2a" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.goutty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.goutty svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.goutty__bounce {
  animation: goutty-bounce 2s ease-in-out infinite;
  transform-origin: 50px 60px;
}

.goutty__blink {
  animation: goutty-blink 4s ease-in-out infinite;
  transform-origin: center;
}

.goutty__arm--left {
  transform-origin: 27px 66px;
}

.goutty__arm--right {
  transform-origin: 73px 66px;
}

.goutty__leg--left {
  transform-origin: 39px 93px;
}

.goutty__leg--right {
  transform-origin: 61px 93px;
}

.goutty--wave .goutty__arm--right {
  animation: goutty-wave 0.8s ease-in-out 3;
}

.goutty--celebrate .goutty__arm--left {
  animation: goutty-celebrate-left 0.6s ease-in-out infinite;
}

.goutty--celebrate .goutty__arm--right {
  animation: goutty-celebrate-right 0.6s ease-in-out infinite;
}

.goutty--celebrate .goutty__bounce {
  animation: goutty-bounce-big 1s ease-in-out infinite;
}

.goutty--reassure .goutty__bounce {
  animation: goutty-reassure 3s ease-in-out infinite;
}

@keyframes goutty-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes goutty-bounce-big {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes goutty-blink {
  0%, 88%, 100% { ry: 0; }
  92%, 96% { ry: 7.5; }
}

@keyframes goutty-wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-35deg); }
  75% { transform: rotate(20deg); }
}

@keyframes goutty-celebrate-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(40deg); }
}

@keyframes goutty-celebrate-right {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-40deg); }
}

@keyframes goutty-reassure {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(-4deg); }
  75% { transform: translateY(-3px) rotate(4deg); }
}
</style>
