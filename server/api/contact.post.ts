import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const messageData = {
      ...body,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    const filePath = resolve("./server/data/messages.json");

    let messages = [];
    try {
      const fileContent = await readFile(filePath, "utf-8");
      messages = JSON.parse(fileContent);
    } catch (error) {}

    messages.push(messageData);

    await writeFile(filePath, JSON.stringify(messages, null, 2));

    return { success: true };
  } catch (error) {
    console.error("Error saving message:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to save message",
    });
  }
});
