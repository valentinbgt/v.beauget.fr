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
    // Exclut le CV des resultats de recherche (et du cache des moteurs).
    // Le noindex doit rester crawlable pour etre pris en compte : ne pas
    // ajouter de Disallow sur /cv dans public/robots.txt.
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });

  return response.body;
});
