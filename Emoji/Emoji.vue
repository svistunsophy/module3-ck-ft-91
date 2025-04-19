<script setup lang="ts">
defineProps({
  emoji: Object,
});
</script>

<template>
  {{ emoji.htmlCode[0] }}
</template>
