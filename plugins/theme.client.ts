export default defineNuxtPlugin(() => {
  // Initialize theme before render to prevent flash
  if (import.meta.client) {
    try {
      const theme = localStorage.getItem("theme");
      // Dark mode by default, unless explicitly set to 'light'
      const shouldBeDark = theme !== "light";

      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    } catch (e) {
      // Fallback to dark if localStorage is not available
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  }
});
