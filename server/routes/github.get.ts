export default defineEventHandler((event) => {
  return sendRedirect(event, "https://github.com/valentinbgt", 302);
});
