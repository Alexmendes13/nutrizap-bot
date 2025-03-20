const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Seus tokens Z-API (confere bem certinho!)
const ZAPI_TOKEN = 'SEU_TOKEN';
const ZAPI_INSTANCE_ID = 'SUA_INSTANCIA';

app.post('/', async (req, res) => {
    const { telefone, mensagem } = req.body;

    if (!telefone) {
        return res.status(400).json({ error: 'Telefone obrigatório' });
    }

    const resposta = `Recebi: ${mensagem || 'Mensagem vazia'}. NutriZap tá online! 🚀`;

    try {
        const apiResponse = await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
            phone: telefone,
            message: resposta
        });

        console.log('Mensagem enviada com sucesso!', apiResponse.data);
        res.status(200).send('Mensagem enviada');
    } catch (err) {
        console.error('Erro ao enviar mensagem', err.response?.data || err.message);
        res.status(500).send('Erro ao enviar mensagem');
    }
});

app.get('/', (req, res) => res.send('NutriZap rodando 🔥'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
