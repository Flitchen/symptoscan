import { GoogleGenerativeAI } from "@google/generative-ai";
import { googleApiKey, newOpenAIapiKey } from "../constants";
// import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(googleApiKey);

export const askChatbot = async (symptom) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 1000,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig,
  });

  const msg = ` ${symptom}`;

  const result = await chat.sendMessage(msg);
  // const result = await model.generateContent(msg);
  const response = result.response;
  const text = response.text();
  // console.log(text);
  return text;
};

// const openai = new OpenAI({ apiKey: newOpenAIapiKey });

// export const askChatbot = async (symptom) => {
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     });

//     console.log(completion.choices[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };
