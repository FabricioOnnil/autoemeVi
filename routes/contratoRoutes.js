import express from 'express';
import carro from '../models/contratoCarroData.js';

const carContract = express.Router();

//Rota para buscar todos os carros.
carContract.get ('/contratos', (req, res) => {
    carro.findAll()
     .then((contrato) => {
        res.json(custos);
     })
     .catch((error) => {
        console.error('Erro ao buscar contrato:', error);
        res.status(500).send('Erro ao buscar contrato.');
     });
});

//Rota para buscar o contrato pelo ID.
carContract.get('/contratos/:id', (req, res) => {
    const idContrato = req.params.id;
    carro.findOne ({ where: { i_contratoCarro_contratoId: idContrato} })
     .then((contrato) => {
        if(!contrato) {
            res.status(404).send('Contrato não encontrado.');
        }else {
            res.json(contrato);
        }
     })
     .catch((error) => {
        res.status(500).send("Erroao buscar contrato: " + error.message);
     });
});

//Rota para cadastrar um novo contrato. 
carContract.post('/contrato', (req, res) => {
    carro.create(req.body)
     .then(() => res.send("Contrato cadastrado com sucesso!"))
     .catch((error) => res.status(500).send("Erro ao cadastrar contrato: " + error.message));
});

//Rota para atualizar um contrato pelo ID.
carContract.put('/contrato/:id', (req, res) => {
    const idContrato = req.params.id;
    carro.update(req.body, { where: { i_contratoCarro_contratoId: idContrato} })
     .then(() => res.send("Contrato atualizados com sucesso!"))
     .catch((error) => res.status(500).send("Erro ao atualizar carro: " + error.message));
});

//Rota para deletar um contrato pelo ID.
carContract.delete('/contrato/:id', (req, res) => {
    const idContrato = req.params.id;
    carro.destroy({ where: { i_contratoCarro_contratoId: idContrato} })
    .then(() => res.send("Contrato deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar contrato: " + error.message));
});

export default carContract;
