app.post('/webhook', async (req, res) => {
    const body = req.body;
    console.log('Webhook recebido:', JSON.stringify(body, null, 2));

    const message = body.text?.message || '';
    const phone = body.phone;

    // Aqui entra IA depois, por enquanto resposta simples
    const resposta = `Recebi sua mensagem: ${message}`;

    if (phone) {
        try {
            await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
                phone: phone,
                message: resposta
            });
            console.log('Resposta enviada com sucesso!');
        } catch (err) {
            console.error('Erro ao responder:', err?.response?.data || err.message);
        }
    }

    res.sendStatus(200); // sempre responde ok pro webhook
});
