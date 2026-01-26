// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "fr", name: "Français", file: "fr.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
    langDir: "locales",
    defaultLocale: "fr",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      fallbackLocale: "fr",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      formUrl: "",
    },
  },
  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Reduce bundle size
  },
  nitro: {
    compressPublicAssets: true, // Enable compression
    minify: true,
    // Optimize static assets
    prerender: {
      crawlLinks: false, // Don't crawl links for static generation
    },
  },
  // Optimize route rules
  routeRules: {
    '/': {
      prerender: true, // Pre-render homepage
      headers: {
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    },
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router'],
            'vendor-i18n': ['@nuxtjs/i18n'],
            'vendor-gsap': ['gsap'],
          },
        },
      },
    },
  },
  app: {
    head: {
      title: "Valentin BEAUGET",
      htmlAttrs: {
        lang: "fr", // Will be updated dynamically by i18n
      },
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        // Preconnect to external domains
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        // DNS prefetch for form submission
        { rel: "dns-prefetch", href: "https://hooks.n8n.cloud" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Portfolio de Valentin BEAUGET - Développeur Fullstack",
        },
      ],
      script: [
        {
          innerHTML: `(function(){try{const theme=localStorage.getItem('theme');const shouldBeDark=theme!=='light';if(shouldBeDark){document.documentElement.classList.add('dark');if(document.body){document.body.classList.add('dark');}else{document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('dark');});}}}catch(e){document.documentElement.classList.add('dark');if(document.body){document.body.classList.add('dark');}else{document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('dark');});}}})();`,
          type: "text/javascript",
        },
      ],
    },
  },
});
