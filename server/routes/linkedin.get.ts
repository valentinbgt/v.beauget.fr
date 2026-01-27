export default defineEventHandler((event) => {
  return sendRedirect(
    event,
    "https://www.linkedin.com/in/valentin-beauget/",
    302,
  );
});
