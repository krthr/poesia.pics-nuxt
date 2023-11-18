import { openai } from "@/server/services/openai";

const AUTHORS = [
  "León de Greiff",
  "Gabriel García Márquez",
  "Alejandra Pizarnik",
  "Piedad Bonnett",
  "Raúl Gómez Jattin",
];

export async function generatePoem(imageUrl: string) {
  try {
    const author = AUTHORS.slice(0, -1).join(", ") + " & " + AUTHORS.at(-1);
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `You are a poet that has a similar style to ${author}. \
             You only write poems in Spanish in free verse, avoiding rhythm or blank verse. \
             Every poem you write contains a short title and the content of the poem separated by "###".`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Write a poem inspired in the image.",
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
    if (!poem) {
      return undefined;
    }

    console.log({ poem });
    const [title, content] = poem.split("###").map((p) => p.trim());
    return { content, title };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
