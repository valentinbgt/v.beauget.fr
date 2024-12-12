import { createReadStream } from "fs";

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="cv.pdf"',
  });

  return sendStream(event, createReadStream("./public/cv.pdf"));
});
