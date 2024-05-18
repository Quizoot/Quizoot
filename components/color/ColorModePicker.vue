<script setup lang="ts">
const toggleColorMode = () => {
  useColorMode().preference =
    useColorMode().preference === 'dark'
      ? 'system'
      : useColorMode().preference === 'system'
        ? 'light'
        : 'dark'
}
</script>

<template>
  <div>
    <button class="btn btn-circle btn-ghost btn-sm" @click="toggleColorMode()">
      <ColorIconLight v-if="$colorMode.preference === 'dark'" />
      <ColorIconSystem v-else-if="$colorMode.preference === 'system'" />
      <ColorIconDark v-else />
    </button>
  </div>
</template>
