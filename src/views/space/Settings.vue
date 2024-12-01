<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部封面图 -->
    <div class="h-48 bg-gradient-animate relative">
      <!-- 返回按钮 -->
      <button class="absolute top-4 left-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/40">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="absolute top-4 left-14 text-white font-medium">个人主页设置</h1>
    </div>

    <!-- 设置表单 -->
    <div class="max-w-2xl mx-auto px-4 -mt-6">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 头像上传 -->
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-full border-4 border-white shadow overflow-hidden">
                <img 
                  :src="formData.avatar || 'https://placekitten.com/200/200'" 
                  alt="avatar"
                  class="w-full h-full object-cover"
                >
              </div>
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                ref="avatarInput"
                @change="handleAvatarUpload"
              >
              <button 
                type="button"
                @click="() => avatarInput?.click()"
                class="absolute bottom-0 right-0 bg-gray-800/70 p-1.5 rounded-full text-white hover:bg-gray-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div class="flex-1">
              <h3 class="font-medium">个人头像</h3>
              <p class="text-sm text-gray-500">推荐使用正方形图片</p>
            </div>
          </div>

          <!-- 封面图上传 -->
          <div class="space-y-2">
            <label class="block font-medium">封面图片</label>
            <div class="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                v-if="formData.cover"
                :src="formData.cover"
                class="w-full h-full object-cover"
              >
              <div 
                v-else
                class="w-full h-full flex items-center justify-center text-gray-400"
              >
                <span>点击上传封面图片</span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="handleCoverUpload"
              >
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="space-y-4">
            <div>
              <label class="block font-medium mb-1">显示名称</label>
              <input 
                v-model="formData.displayName"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#55cdfc] focus:border-[#55cdfc] outline-none"
                placeholder="输入你想显示的名称"
              >
            </div>

            <div>
              <label class="block font-medium mb-1">用户名</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-gray-500">@</span>
                <input 
                  v-model="formData.username"
                  type="text"
                  class="w-full pl-7 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#55cdfc] focus:border-[#55cdfc] outline-none"
                  placeholder="用户名"
                >
              </div>
            </div>

            <div>
              <label class="block font-medium mb-1">个人简介</label>
              <textarea 
                v-model="formData.bio"
                rows="3"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#55cdfc] focus:border-[#55cdfc] outline-none resize-none"
                placeholder="介绍一下自己..."
              ></textarea>
            </div>

            <div>
              <label class="block font-medium mb-1">所在城市</label>
              <input 
                v-model="formData.location"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#55cdfc] focus:border-[#55cdfc] outline-none"
                placeholder="你所在的城市"
              >
            </div>

            <div>
              <label class="block font-medium mb-1">代词</label>
              <input 
                v-model="formData.pronouns"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#55cdfc] focus:border-[#55cdfc] outline-none"
                placeholder="例如：她/她、他/他、ta/ta"
              >
            </div>

            <div class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="showGender"
                v-model="formData.showGender"
                class="w-4 h-4 text-[#55cdfc] border-gray-300 rounded focus:ring-[#55cdfc]"
              >
              <label for="showGender" class="text-gray-700">
                在个人主页显示性别选项
              </label>
            </div>
          </div>

          <!-- 提交按钮 -->
          <div class="flex justify-end pt-4">
            <button 
              type="submit"
              class="px-6 py-2 bg-[#55cdfc] text-white rounded-full hover:bg-[#55cdfc]/90 transition-colors"
            >
              保存更改
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatarInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  avatar: '',
  cover: '',
  displayName: 'Test',
  username: 'test_user',
  bio: '这是一段测试简介文字',
  location: '测试城市',
  pronouns: '她/她',
  showGender: false
})

const handleAvatarUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      formData.value.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleCoverUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      formData.value.cover = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  // TODO: 处理表单提交
  console.log('提交的表单数据：', formData.value)
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
</style>