const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Configuração
const ZAPI_INSTANCE_ID = '3DE7C43498DEB0E7A28332C54B267657';
const ZAPI_TOKEN = 'AFB512DDD2891F0B378EC8D4';
const OPENAI_API_KEY = 'sk-...'; // SUA CHAVE AQUI

// Endpoint principal do bot
app.post('/webhook', async (req, res) => {
    const data = req.body;

    if (!data.message || !data.message.text) {
        console.log('Mensagem inválida recebida');
        return res.sendStatus(200);
    }

    const mensagemUsuario = data.message.text;
    const numero = data.message.phone;

    console.log(`Recebi do ${numero}: ${mensagemUsuario}`);

    // Gerar resposta da IA
    let resposta = "Desculpe, não entendi.";
    try {
        const completion = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: mensagemUsuario }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        resposta = completion.data.choices[0].message.content;
    } catch (err) {
        console.error('Erro na OpenAI:', err.response ? err.response.data : err.message);
    }

    // Enviar a resposta no WhatsApp
    try {
        await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
            phone: numero,
            message: resposta
        });
        console.log('Mensagem enviada:', resposta);
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err.response ? err.response.data : err.message);
    }

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NutriZap rodando na porta ${PORT}`));
