import { OpenAI } from "openai";

const runtimeConfig = useRuntimeConfig();

export const openai = new OpenAI({
  apiKey: runtimeConfig.openai.apiKey,
});
