<script setup>
import ChatHistory from '@/components/ChatHistory.vue';
import ChatInput from '@/components/ChatInput.vue';
import ChatWelcome from '@/components/ChatWelcome.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import Knowledge from '@/components/Knowledge.vue';
import UserLogin from '@/components/UserLogin.vue';
import { useChatStore } from '@/store/chat';

const chatStore = useChatStore()
</script>

<template>
  <div class="home-container">
    <ChatHistory />
    <ChatWindow v-if="chatStore.getChatWelcome === false" />
    <ChatWelcome v-else/>
  </div>
  <ChatInput />
  <Knowledge />
  <UserLogin />
</template>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
}

</style>