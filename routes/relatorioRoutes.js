import express from 'express';
import comida from '../models/refeicaoData.js'; 
import reparo from '../models/reparoData.js'; 
import abastecimentoModelo from '../models/abastecimentoData.js'; 

const relatorioRouter = express.Router();

// Rota para buscar dados da tabela comida
relatorioRouter.get('/comida', async (req, res) => {
    try {
        const refeicoes = await comida.findAll();
        res.json(refeicoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de refeições' });
    }
});

// Rota para buscar dados da tabela reparo
relatorioRouter.get('/reparo', async (req, res) => {
    try {
        const reparos = await reparo.findAll();
        res.json(reparos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de reparos' });
    }
});

// Rota para buscar dados da tabela abastecimento
relatorioRouter.get('/abastecimento', async (req, res) => {
    try {
        const abastecimentos = await abastecimentoModelo.findAll();
        res.json(abastecimentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de abastecimentos' });
    }
});

export default relatorioRouter;
