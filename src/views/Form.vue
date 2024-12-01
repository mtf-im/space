<template>
  <div class="min-h-screen w-full flex justify-center items-center bg-gradient-animate overflow-hidden">
    <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full" :class="step === 1 ? 'max-w-2xl' : 'max-w-md'">
      <!-- 步骤指示器 -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full bg-[#55cdfc] text-white flex items-center justify-center">1</div>
          <div class="h-1 w-16 mx-2" :class="step === 2 ? 'bg-[#55cdfc]' : 'bg-gray-300'"></div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center"
               :class="step === 2 ? 'bg-[#55cdfc] text-white' : 'bg-gray-300 text-gray-600'">2</div>
        </div>
      </div>

      <!-- 标题 -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ step === 1 ? '开始你的申请' : '完善个人信息' }}
      </h2>
      
      <!-- 第一步 -->
      <div v-if="step === 1" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-gray-700 mb-2">申请说明</label>
          <textarea 
            v-model="formData.application"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 
                   focus:border-[#55cdfc] focus:ring-2 focus:ring-[#55cdfc]/50 
                   outline-none transition h-64 resize-none"
            placeholder="请在这里包含你的身份自证, 比如TransHub账号以及其他证明..."
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 mb-2">上传图片</label>
          <div class="flex items-center justify-center w-full">
            <label 
              class="flex flex-col items-center justify-center w-full h-32 
                     border-2 border-gray-300 border-dashed rounded-lg 
                     cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500">
                  <span class="font-semibold">点击上传图片</span>
                </p>
                <p class="text-xs text-gray-500">PNG, JPG or GIF (最大 2MB)</p>
              </div>
              <input 
                type="file" 
                class="hidden" 
                accept="image/*"
                @change="handleFileUpload"
              >
            </label>
          </div>
          <!-- 预览已上传的图片 -->
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Preview" class="max-h-32 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button 
            @click="nextStep"
            class="px-8 py-3 bg-gradient-to-r from-[#55cdfc] to-[#f7a8b8] text-white rounded-lg 
                   shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            下一步
          </button>
        </div>
      </div>

      <!-- 第二步 -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-gray-700">昵称</label>
          <input 
            v-model="formData.nickname"
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#55cdfc] focus:ring-2 focus:ring-[#55cdfc]/50 outline-none transition"
            placeholder="输入你想要的昵称"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700">邮箱</label>
          <input 
            v-model="formData.email"
            type="email"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#55cdfc] focus:ring-2 focus:ring-[#55cdfc]/50 outline-none transition"
            placeholder="example@email.com"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700">个人简介</label>
          <textarea 
            v-model="formData.bio"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#55cdfc] focus:ring-2 focus:ring-[#55cdfc]/50 outline-none transition h-32 resize-none"
            placeholder="介绍一下自己吧..."
          ></textarea>
        </div>

        <div class="flex justify-between">
          <button 
            type="button"
            @click="prevStep"
            class="px-8 py-3 bg-gray-500 text-white rounded-lg shadow-lg 
                   transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            上一步
          </button>
          <button 
            type="submit"
            class="px-8 py-3 bg-gradient-to-r from-[#55cdfc] to-[#f7a8b8] text-white rounded-lg 
                   shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            提交申请
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const step = ref(1)
const imagePreview = ref('')

const formData = ref({
  application: '',
  image: null as File | null,
  nickname: '',
  email: '',
  bio: ''
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB')
      return
    }
    formData.value.image = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const nextStep = () => {
  if (!formData.value.application.trim()) {
    alert('请填写申请说明')
    return
  }
  step.value = 2
}

const prevStep = () => {
  step.value = 1
}

const handleSubmit = () => {
  // 表单验证
  if (!formData.value.nickname.trim() || !formData.value.email.trim()) {
    alert('请填写必要信息')
    return
  }
  // TODO: 处理表单提交逻辑
  console.log('表单数据：', formData.value)
}
</script>

<style>
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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
