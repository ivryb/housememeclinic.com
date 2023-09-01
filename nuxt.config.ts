// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // redisUrl: process.env.NUXT_REDIS_URL,
    openAiKey: process.env.NUXT_OPEN_AI_KEY,
  },

  modules: [
    // '@pinia/nuxt',
    // '@nuxt/image',
    // '@nuxtjs/plausible',
    'nuxt-icon',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
});
