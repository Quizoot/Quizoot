<script setup lang="ts">
defineProps({
  emoji: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="custom-grid grid h-20 rounded-xl">
    <div class="grid items-center">
      <UiHeadingFour class="m-6 text-center">{{ emoji }}</UiHeadingFour>
    </div>
    <div class="my-2 h-auto justify-center bg-black"></div>
    <UiHeadingFour class="col-span-2 m-6 justify-center text-center">
      {{ playerName }}
    </UiHeadingFour>
  </div>
</template>

<style scoped>
.custom-grid {
  grid-template-columns: 1fr 0.5px 1fr 1fr;
}
</style>
