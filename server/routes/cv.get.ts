export default defineEventHandler(async (event) => {
  const response = await fetch("https://drive.beauget.fr/s/cv/download");

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: "Failed to fetch CV, please try again later.",
    });
  }

  setResponseHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="cv.pdf"',
  });

  return response.body;
});
