// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // redisUrl: process.env.NUXT_REDIS_URL,
    openAiKey: process.env.NUXT_OPEN_AI_KEY,
  },

  modules: ['@nuxtjs/plausible', 'nuxt-icon', 'nuxt-security'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plausible: {
    apiHost: 'https://analytics.rybnikov.rocks',
    domain: process.env.NUXT_PUBLIC_APP_DOMAIN,
    trackLocalhost: false,
  },

  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 'day',
    },
    headers: false,
    requestSizeLimiter: false,
    xssValidator: false,
    corsHandler: false,
    allowedMethodsRestricter: false,
    hidePoweredBy: true,
    basicAuth: false,
    // enabled: false,
    csrf: false,
  },

  css: ['~/assets/css/main.css'],
});
