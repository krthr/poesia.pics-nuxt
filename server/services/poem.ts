import { openai } from "@/server/services/openai";

const AUTHORS = [];

export async function generatePoem(imageUrl: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "",
      messages: [
        {
          role: "system",
          content: "",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    const poem = response.choices.at(0)?.message.content?.trim();
    return poem;
  } catch (error) {
    return undefined;
  }
}
