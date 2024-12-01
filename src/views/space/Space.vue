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
    </div>

    <!-- 个人信息卡片 -->
    <div class="max-w-2xl mx-auto px-4 relative">
      <!-- 头像 -->
      <div class="absolute -top-16 left-4">
        <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <img 
            src="https://placekitten.com/200/200" 
            alt="avatar"
            class="w-full h-full object-cover"
          >
        </div>
      </div>

      <!-- 编辑按钮 -->
      <div class="flex justify-end pt-4">
        <router-link 
          :to="`/${userid}/settings`" 
          class="px-4 py-1.5 border border-gray-300 rounded-full font-medium hover:bg-gray-50 inline-block"
        >
          编辑个人资料
        </router-link>
      </div>

      <!-- 用户信息 -->
      <div class="mt-6">
        <h1 class="text-xl font-bold">TestName</h1>
        <p class="text-gray-500">@TestUsername</p>
        
        <div class="mt-4 text-gray-700">
          <p>Test</p>TestGender | TestAge | TestGender
          <p class="mt-2">✨</p>
          
          <div class="flex items-center mt-2 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="ml-2">北京</span>
            
            <svg class="w-5 h-5 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="ml-2">2023年加入</span>
          </div>
          
          <div class="flex mt-4">
            <a href="#" class="flex items-center hover:underline">
              <span class="font-bold text-gray-900">142</span>
              <span class="ml-1 text-gray-500">正在关注</span>
            </a>
            <a href="#" class="flex items-center ml-4 hover:underline">
              <span class="font-bold text-gray-900">238</span>
              <span class="ml-1 text-gray-500">关注者</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="mt-4 border-b">
        <div class="flex">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="currentTab = tab.id"
            class="px-4 py-4 font-medium relative"
            :class="currentTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-100'"
          >
            {{ tab.name }}
            <div 
              v-if="currentTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#55cdfc]"
            ></div>
          </button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="py-4">
        <div v-if="currentTab === 'posts'" class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="border rounded-xl p-4">
            <div class="flex items-start space-x-3">
              <img :src="post.avatar" alt="avatar" class="w-12 h-12 rounded-full">
              <div class="flex-1">
                <div class="flex items-center">
                  <span class="font-bold">{{ post.name }}</span>
                  <span class="text-gray-500 ml-2">@{{ post.username }}</span>
                  <span class="text-gray-500 ml-2">· {{ post.time }}</span>
                </div>
                <p class="mt-2">{{ post.content }}</p>
                <div class="mt-3 flex items-center space-x-8 text-gray-500">
                  <button class="hover:text-[#55cdfc]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button class="hover:text-pink-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const currentTab = ref('posts')
const tabs = [
  { id: 'posts', name: '动态' },
  { id: 'replies', name: '回复' },
  { id: 'media', name: '媒体' },
  { id: 'likes', name: '喜欢' }
]

const posts = [
  {
    id: 1,
    name: 'TestName',
    username: 'TestUsername',
    avatar: 'https://placekitten.com/200/200',
    content: 'TestContent',
    time: 'TestTime'
  },
  // 可以添加更多动态
]

const userid = useRoute().params.userid
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