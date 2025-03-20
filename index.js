const openaiResponse = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: mensagem }]
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  }
);

const resposta = openaiResponse.data.choices[0].message.content;
