import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });

export async function POST({ request }) {
  const { url } = await request.json();

  const messages = [
    {
      role: "user",
      content: `Create a comprehensive pitch deck text for the following business URL: ${url}`,
    },
  ];
  console.log("Messages for OpenAI:", messages);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
    });

    const pitchDeckText = response.data.choices[0]?.message.content.trim();
    console.log("Pitch deck text:", pitchDeckText);

    return {
      status: 200,
      body: { pitchDeckText },
    };
  } catch (error) {
    console.error("Request Error:", error);
    return {
      status: 500,
      body: { error: "An error occurred while processing your request." },
    };
  }
}
