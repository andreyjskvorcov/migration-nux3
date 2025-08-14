// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  alias: {
    "@": "../",
  },

  dir: {
    pages: "./routes",
    layouts: "./layouts",
  },

  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },
});
