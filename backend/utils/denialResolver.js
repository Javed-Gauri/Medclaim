import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getDenialResolution = async (denialCode, payer, procedure) => {
  const prompt = `
You are an expert AR specialist. 
Given the following details, provide a 3-step denial resolution plan.

Denial Code: ${denialCode}
Payer: ${payer}
Procedure: ${procedure}

Return response in this format:
1. Resolution Steps
2. Required Documents
3. Sample Appeal Message
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
};
