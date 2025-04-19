<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps({ emojis: Array });

const emit = defineEmits(['selectEmoji']);

function handleClick(emoji) {
  emit('selectEmoji', emoji);
}
</script>

<template>
  <ul class="emoji-list">
    <li v-for="emoji in emojis" :key="emoji.id" @click="handleClick(emoji)">
      <emoji :emoji="emoji"></emoji>
    </li>
  </ul>
</template>

<style scoped>
.emoji-list li {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
</style>
