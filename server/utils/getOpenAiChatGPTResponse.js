import { Configuration, OpenAIApi } from 'openai';

import { OpenAIStream } from 'ai';

const { openAiKey } = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: openAiKey,
});

const openai = new OpenAIApi(configuration);

export const getOpenAiChatGPTResponse = async ({
  userMessage,
  systemPrompt,
  savedMessages,
  stream,
}) => {
  const messages = [
    systemPrompt ? { role: 'system', content: systemPrompt } : null,
    ...(savedMessages ?? []),
    userMessage ? { role: 'user', content: userMessage } : null,
  ].filter(Boolean);

  let requestTime = Date.now();

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: Boolean(stream),
      messages,
    });

    if (stream) {
      return OpenAIStream(response);
    }

    const { data } = response;

    return {
      responseText: data.choices[0].message.content,
      usage: data.usage,
      totalTokensUsage: data.usage.total_tokens,
      requestTime: Number(((Date.now() - requestTime) / 1000).toFixed(2)),
    };
  } catch (error) {
    console.log('OpenAI error');
    console.error(error);

    throw createError({
      statusCode: 503,
      statusMessage: 'OpenAI responed with an error :( ' + error.message,
    });
  }
};
