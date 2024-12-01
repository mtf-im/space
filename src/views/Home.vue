<template>
  <div class="min-h-screen w-full flex justify-center items-center bg-gradient-animate overflow-hidden">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">
        <div class="relative inline-flex">
          <span>{{ displayedText }}</span>
          <span class="animate-blink absolute -right-[20px] top-0">|</span>
        </div>
      </h1>
      <p class="text-xl text-gray-700 mb-8">这里是属于MtF群体的温暖社区</p>
      <div class="inline-block">
        <router-link 
          to="/form"
          class="inline-block px-8 py-4 text-lg bg-white text-gray-800 rounded-full shadow-lg 
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          开启你的Space
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const fullText = '欢迎来到 MtF.im'
const displayedText = ref('')
const currentIndex = ref(0)

const typeText = () => {
  if (currentIndex.value < fullText.length) {
    displayedText.value += fullText[currentIndex.value]
    currentIndex.value++
    setTimeout(typeText, 150) // 控制打字速度
  }
}

onMounted(() => {
  typeText()
})
</script>

<style>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

.bg-gradient-animate {
  background: linear-gradient(
    -45deg,
    #55cdfc 15%,
    #f7a8b8 30%,
    #ffffff 50%,
    #f7a8b8 70%,
    #55cdfc 85%
  );
  background-size: 400% 400%;
  animation: gradient-flow 15s ease infinite;
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
