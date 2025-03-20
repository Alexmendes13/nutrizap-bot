const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Tokens da Z-API
const ZAPI_TOKEN = 'AFB512DDD2891F0B378ECB4D';
const ZAPI_INSTANCE_ID = '3DE7C43498DBE0E7A28332C54B267657';

app.post('/', async (req, res) => {
    const { telefone, texto } = req.body;
    console.log('Recebido:', req.body);

    if (!telefone) {
        return res.status(400).json({ error: 'Telefone é obrigatório' });
    }

    const mensagem = texto?.mensagem || 'Mensagem vazia';
    const resposta = `Recebi: "${mensagem}". NutriZap tá online!`;

    try {
        console.log("Enviando para Z-API:", telefone, resposta);

        const apiResponse = await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
            phone: telefone,   // OBRIGATÓRIO ser 'phone'
            message: resposta
        });

        console.log('Mensagem enviada com sucesso:', apiResponse.data);
        res.status(200).send('Mensagem enviada!');
    } catch (err) {
        console.error('Erro ao enviar:', err?.response?.data || err.message);
        res.status(500).send('Erro ao enviar mensagem');
    }
});

app.get('/', (req, res) => res.send('NutriZap rodando 🔥'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
