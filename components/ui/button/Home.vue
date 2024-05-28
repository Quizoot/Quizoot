<!-- This is the buttons just for the index page, they are special but they are beautiful -->
<script setup lang="ts">
defineProps({
  to: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <NuxtLink :to="to">
    <UiButtonRegular
      class="btn-md w-[90vw] text-[17px] font-medium shadow-sm md:btn-lg dark:text-black sm:mx-auto sm:max-w-md"
    >
      <slot></slot>
    </UiButtonRegular>
  </NuxtLink>
</template>
