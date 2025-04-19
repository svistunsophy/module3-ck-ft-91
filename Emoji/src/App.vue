<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchEmojis } from './composables/fetch-emojis';
import EmojiList from './components/EmojiList.vue';

const emojis = ref([]);
const selectedSmiles = ref([null, null]);

onMounted(async () => {
  await fetchEmojis();
});

function setSelectedSmile(index, emoji) {
  selectedSmiles.value[index] = emoji;
}
</script>

<template>
  <emoji-list :emojis="emojis" @selectEmoji="setSelectedSmile.bind(null, 0)" />
  <emoji-list :emojis="emojis" @selectEmoji="setSelectedSmile.bind(null, 1)" />
  <emoji-mixer
    :first-emoji="selectedSmiles[0]"
    :second-emoji="selectedSmiles[1]"
  />
</template>
