export default defineEventHandler((event) => {
  return sendRedirect(event, "https://mmi23a02.mmi-troyes.fr/", 302);
});
