<!-- This is the button at the bottom of the screen for smaller devices -->
<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <button
    class="text-md btn font-[400] md:text-xl"
    :class="[disabled ? 'btn-disabled' : '', shadow ? 'shadow-md' : '']"
  >
    <slot></slot>
  </button>
</template>
