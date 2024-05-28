<script setup lang="ts">
defineProps({
  players: {
    type: Array as PropType<{ name: string; emoji: string }[]>,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
    <UiHeadingFour
      v-for="(player, index) in players"
      :key="player.name"
      class="overflow-x-clip rounded-xl text-center"
      :class="[['bg-primary', 'bg-secondary', 'bg-accent', 'bg-[#FCC93B]'][index % 4]]"
    >
      <div class="custom-grid grid rounded-xl">
        <div class="grid items-center">
          <UiHeadingFour class="m-6 text-center">{{ player.emoji }}</UiHeadingFour>
        </div>
        <div class="my-2 h-auto justify-center bg-black"></div>
        <UiHeadingFour class="col-span-2 m-6 justify-center text-center dark:text-black">
          {{ player.name }}
        </UiHeadingFour>
      </div>
    </UiHeadingFour>
  </div>
</template>

<style scoped>
.custom-grid {
  grid-template-columns: 1fr 1px 1fr 1fr;
}
</style>
