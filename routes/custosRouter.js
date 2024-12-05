import express from 'express';
import carro from '../models/custosCarroData.js';

const carCosts = express.Router();

//Rota para buscar todos os carros. 
carCosts.get ('/custos', (req, res) =>{
    carro.findAll()
     .then((custos) => {
        res.json(custos);
     })
     .catch((error) => {
        console.error('Erro ao buscar custos do contrato:', error);
        res.status(500).send('Erro ao buscar custos.');
     });
});

//Rota para buscar o custoFixo pelo ID.
carCosts.get('/custos/:id', (req, res) => {
    const idCusto = req.params.id;
    carro.findOne ({ where: { i_custosCarro_custosId: idCusto} })
     .then((custos) => {
        if(!custos) {
            res.status(404).send('custo não encontrado.');
        }else {
            res.json(custos);
        }
     })
     .catch((error) => {
        res.status(500).send("Erro ao buscar custos: " + error.message);
     });
});

//Rota para cadastrar um novo custo.
carCosts.post('/custos', (req, res) => {
    carro.create(req.body)
     .then(() => res.send("Custo cadastrado com sucesso!"))
     .catch((error) => res.status(500).send("Erro ao cadastrar custo: " + error.message));
});

//Rota para atualizar um custo pelo ID. 
carCosts.put('/custos/:id', (req, res) => {
    const idCusto = req.params.id;
    carro.update(req.body, { where: { i_custosCarro_custosId: idCusto} })
    .then(() => res.send("Custos atualizados com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar carro: " + error.message));
});

//Rota para deletar um custo pelo ID.
carCosts.delete('/custos/:id', (req, res) => {
    const idCusto = req.params.id;
    carro.destroy({ where: { i_custosCarro_custosId: idCusto } })
    .then(() => res.send("Custo deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar custos: " + error.message));
});

export default carCosts;