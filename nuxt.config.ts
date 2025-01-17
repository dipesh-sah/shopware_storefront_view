// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  extends: [
    "@shopware-pwa/composables-next/nuxt-layer",
    "@shopware-pwa/cms-base",
  ],

  runtimeConfig: {
    shopware: {
      /**
       * SSR Shopware Endpoint
       * More here: https://frontends.shopware.com/getting-started/templates/custom-vue-project.html#shopware-endpoint-on-the-ssr-mode
       */
      // endpoint: "",
    },
    // public: {
    //   endpoint: "https://demo-frontends.shopware.store/store-api/",
    //   accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
    //   devStorefrontUrl: "",
    /**
     * Example for API Client configuration.
     */
    //   apiClientConfig: {
    //     headers: {
    //       "global-heder-example": "global-header-example-value",
    //     },
    //   },
    // },
    /**
     * Example for API Client configuration
     *
     */

    // apiClientConfig: {
    //   headers: {
    //     "ssr-heder-example": "ssr-header-example-value",
    //   },
    // },
    /**
     * More about this feature you can find here: https://frontends.shopware.com/getting-started/features/broadcasting.html
     */
    broadcasting: false,
  },

  shopware: {
    accessToken: process.env.Access_key,
    endpoint: `${process.env.baseUrl}/store-api/`,
    devStorefrontUrl: process.env.baseUrl,
  },

  routeRules: {
    "/": {
      isr: 60 * 60 * 24,
    },
    "/checkout": {
      ssr: false,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
    "/checkout/**": {
      ssr: false,
    },
    "/login": {
      ssr: false,
    },
    "/register": {
      ssr: false,
    },
    "/reset-password": {
      ssr: false,
    },
    "/wishlist": {
      ssr: false,
    },
    "/account": {
      ssr: false,
    },
    "/account/**": {
      ssr: false,
    },
    "/search": {
      ssr: false,
    },
    "/search/**": {
      ssr: false,
    },
    "/**": {
      isr: 60 * 60 * 24,
    },
  },

  /**
   * Commented because of the StackBlitz error
   * Issue: https://github.com/shopware/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    strict: true,
  },

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@shopware-pwa/nuxt3-module",
    "@nuxtjs/i18n",
  ],

  // components: true,
  components: {
    dirs: [
      {
        path: "~/components",
        priority: 2,
      },
    ],
    global: true,
  },

  vueuse: {
    ssrHandlers: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

  unocss: {
    // for presets, theme config, ... look at the uno.config.ts file
  },

  css: [
    "@unocss/reset/tailwind-compat.css", // needed to reset styles see https://unocss.dev/guide/style-reset (@unocss/reset)
    "~/assets/css/global.css",
  ],

  router: {
    options: {
      linkActiveClass: "link-active",
      linkExactActiveClass: "link-exact-active text-primary",
    },
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en-GB",
    detectBrowserLanguage: false,
    langDir: "./i18n/src/langs/",
    vueI18n: "./i18n/config",
    locales: [
      {
        code: "en-GB",
        language: "en-GB",
        file: "en-GB.ts",
      },
      {
        code: "pl-PL",
        language: "pl-PL",
        file: "pl-PL.ts",
      },
      {
        code: "testde",
        language: "de-DE",
        file: "de-DE.ts",
        localeId: "c19b753b5f2c4bea8ad15e00027802d4",
      },
    ],
  },

  telemetry: false,
  compatibilityDate: "2025-01-15",
});
