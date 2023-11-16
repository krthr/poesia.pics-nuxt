// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "es",
        "data-theme": "cupcake",
      },
    },
  },

  routeRules: {
    "/": {
      experimentalNoScripts: true,
    },
    "/poems/**": {
      experimentalNoScripts: true,
    },
  },

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxt/image", "@pinia/nuxt"],
});
