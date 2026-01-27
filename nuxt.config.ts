// https://nuxt.com/docs/api/configuration/nuxt-config

// Debug: Log environment variables at build time
if (process.env.NUXT_PUBLIC_FORM_URL) {
  console.log(
    "[Nuxt Config] ✓ NUXT_PUBLIC_FORM_URL is set:",
    process.env.NUXT_PUBLIC_FORM_URL.substring(0, 30) + "...",
  );
} else if (process.env.FORM_URL) {
  console.log(
    "[Nuxt Config] ✓ FORM_URL is set (fallback):",
    process.env.FORM_URL.substring(0, 30) + "...",
  );
} else {
  console.warn(
    "[Nuxt Config] ⚠️ WARNING: Neither NUXT_PUBLIC_FORM_URL nor FORM_URL is set!",
  );
  console.warn(
    "[Nuxt Config] The contact form will not work. Set NUXT_PUBLIC_FORM_URL in your .env file or environment variables.",
  );
}

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
    // Note: In Nuxt 3, empty string defaults don't get replaced by env vars
    // We must explicitly reference process.env for it to work
    public: {
      formUrl: process.env.NUXT_PUBLIC_FORM_URL || process.env.FORM_URL || "",
    },
  },
  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Reduce bundle size
  },
  // Fix for i18n compatibility with Nuxt 4
  build: {
    transpile: ["@nuxtjs/i18n"],
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
    "/": {
      prerender: true, // Pre-render homepage
      headers: {
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    },
    // Cache static assets for 1 year
    "/images/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      // Removed manual chunks to avoid i18n compatibility issues with Nuxt 4
      // Vite will handle code splitting automatically
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
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        // DNS prefetch for form submission
        { rel: "dns-prefetch", href: "https://hooks.n8n.cloud" },
        // Load fonts asynchronously to prevent render-blocking
        // Critical font (Inter) - loaded with high priority
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
        // Non-critical fonts - loaded with lower priority
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Krona+One&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
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
        // Fallback for browsers that don't support onload on link tags
        {
          innerHTML: `(function(){var links=document.querySelectorAll('link[media="print"]');for(var i=0;i<links.length;i++){links[i].onload=function(){this.media='all'};links[i].onerror=function(){this.media='all'}}}());`,
          type: "text/javascript",
        },
      ],
    },
  },
});
