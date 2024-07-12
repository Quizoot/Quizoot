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
  textSize: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <button
    class="btn font-[400]"
    :class="[
      disabled ? 'btn-disabled' : '',
      shadow ? 'shadow-md' : '',
      textSize ? 'text-md md:text-xl' : '',
    ]"
  >
    <slot></slot>
  </button>
</template>
