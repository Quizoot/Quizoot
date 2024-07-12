// https://nuxt.com/docs/api/configuration/nuxt-config

const routerBase = process.env.GH_PAGES ? '/Quizoot/' : '/'

export default defineNuxtConfig({
  app: {
    baseURL: routerBase,
    buildAssetsDir: 'assets',
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-viewport',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
    '@pinia/nuxt',
  ],

  experimental: {
    payloadExtraction: false,
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  image: {
    quality: 90,
    provider: 'ipx',
    ipx: {
      maxAge: 31536000,
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    dataValue: 'theme',
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-'),
    },
  },

  site: {
    name: 'Quizoot',
    description: 'Play Quizoot online with friends!',
  },

  eslint: {
    checker: true,
  },

  fonts: {
    families: [
      {
        name: 'Roboto',
        provider: 'google',
        weights: ['100', '200', '300', '400', '500', '600'],
      },
    ],
  },

  compatibilityDate: '2024-07-12',
})
