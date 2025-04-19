<script setup lang="ts">
import { computed, defineProps } from 'vue';

defineProps({
  firstEmoji: Object,
  secondEmoji: Object,
});

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0]
      .replace('U+', '')
      .toLowerCase();
    const unicodeSecond = props.secondEmoji.unicode[0]
      .replace('U+', '')
      .toLowerCase();
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`;
  }
});
</script>

<template>
  <div class="mixer-container">
    <emoji :emoji="firstEmoji" /> + <emoji :emoji="secondEmoji" />
    <img
      v-if="kitchenEmoji"
      :src="kitchenEmoji"
      alt="Mixed emoji"
      width="96"
      height="96"
    />
  </div>
</template>

<style scoped>
.mixer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
