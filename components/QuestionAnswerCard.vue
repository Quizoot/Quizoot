<script setup lang="ts">
defineProps({
  numAnswers: {
    type: Number,
    required: true,
  },
  countryChoice: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="custom-grid grid">
    <div class="grid items-center">
      <UiHeadingFour
        class="m-6 text-center dark:text-black"
        :class="[correct ? 'font-[600]' : '']"
        >{{ numAnswers }}</UiHeadingFour
      >
    </div>
    <div class="my-2 h-auto justify-center bg-black"></div>
    <UiHeadingFour
      class="col-span-2 m-6 justify-center text-center dark:text-black"
      :class="[correct ? 'font-[600]' : '']"
    >
      {{ countryChoice }}
    </UiHeadingFour>
  </div>
</template>

<style scoped>
.custom-grid {
  grid-template-columns: 1fr 1px 1fr 1fr;
}
</style>
