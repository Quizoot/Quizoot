<script setup lang="ts"></script>

<template>
  <div>
    <div class="min-h-dvh">
      <TopNavigation />
      <UiHeadingOne class="font-[600]">Credits</UiHeadingOne>
      <div class="m-8">
        <div>
          <UiHeadingThree class="m-auto text-center font-[500]">Libraries</UiHeadingThree>
        </div>
        <div
          class="m-auto flex flex-wrap content-stretch items-center justify-center gap-x-8 gap-y-2 text-center sm:gap-y-4"
        >
          <div>
            <NuxtLink href="https://nuxt.com/" target="_blank"> Nuxt </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://vuejs.org/" target="_blank"> Vue </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://pinia.vuejs.org/" target="_blank"> Pinia </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://vueuse.org/" target="_blank"> VueUse </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://vitejs.dev/" target="_blank"> Vite </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://socket.io/" target="_blank"> Socket.IO </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://github.com/unjs/uqr" target="_blank"> uqr </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://github.com/unjs/uncrypto" target="_blank"> uncrypto </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://github.com/leizongmin/js-xss" target="_blank"> xss </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://eslint.org/" target="_blank"> ESLint </NuxtLink>
          </div>
        </div>
      </div>

      <div class="m-8">
        <div>
          <UiHeadingThree class="m-auto text-center font-[500]">UI / UX</UiHeadingThree>
        </div>
        <div
          class="m-auto flex flex-wrap content-stretch items-center justify-center gap-x-8 gap-y-4 text-center"
        >
          <div>
            <NuxtLink href="https://github.com/Afif13/" target="_blank"> CSS Loaders </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://daisyui.com/" target="_blank"> daisyUI </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://tailwindcss.com/" target="_blank"> Tailwind CSS </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://swiperjs.com/" target="_blank"> Swiper </NuxtLink>
          </div>
        </div>
      </div>

      <div class="m-8">
        <div>
          <UiHeadingThree class="m-auto text-center font-[500]">APIs</UiHeadingThree>
        </div>
        <div
          class="m-auto flex flex-wrap content-stretch items-center justify-center gap-x-8 gap-y-4 text-center"
        >
          <div>
            <NuxtLink href="https://restcountries.com/" target="_blank"> Rest Countries </NuxtLink>
          </div>
          <div>
            <NuxtLink href="https://flagpedia.net/" target="_blank"> Flags API & CDN </NuxtLink>
          </div>
        </div>
      </div>

      <div class="m-8">
        <div>
          <UiHeadingThree class="m-auto text-center font-[500]">Icons</UiHeadingThree>
        </div>
        <div
          class="m-auto flex flex-wrap content-stretch items-center justify-center gap-x-8 gap-y-4 text-center"
        >
          <div>
            <NuxtLink href="https://heroicons.com/" target="_blank"> Heroicons </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
