<script setup lang="ts">
const toggleColorMode = () => {
  const colorModePreference = useColorMode().preference
  if (colorModePreference === 'dark') {
    useColorMode().preference = 'system'
  } else if (colorModePreference === 'system') {
    useColorMode().preference = 'light'
  } else {
    useColorMode().preference = 'dark'
  }
}
</script>

<template>
  <div>
    <button class="btn btn-circle btn-ghost btn-sm" @click="toggleColorMode()">
      <ColorIconLight v-if="$colorMode.preference === 'light'" />
      <ColorIconSystem v-else-if="$colorMode.preference === 'system'" />
      <ColorIconDark v-else />
    </button>
  </div>
</template>
