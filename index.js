const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const ZAPI_TOKEN = 'AFB512DDD2891F0B378EC8D4';
const ZAPI_INSTANCE_ID = '3DE7C43498DEB0E7A28332C54B267657';

app.post('/', async (req, res) => {
    const body = req.body;
    console.log('Recebido:', body);

    const telefone = body.telefone || body.fromMe;
    const mensagem = body.texto?.mensagem || 'Mensagem vazia';

    const resposta = `Recebi: "${mensagem}". NutriZap tá online!`;

    try {
        await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
            phone: telefone,
            message: resposta
        });
        console.log('Mensagem enviada');
    } catch (err) {
        console.error('Erro ao enviar:', err.response?.data);
    }

    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('NutriZap rodando 🔥'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`)
