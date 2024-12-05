import express from 'express';
import reparo from '../models/reparoData.js';

const reparoRouter = express.Router();

// Rota para obter todos os postos de reparo
reparoRouter.get('/reparo', (req, res) => {
    reparo.findAll()
      .then(reparo => {
        res.json(reparo);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter reparo: " + error.message);
      });
  });
  
  // Rota para obter uma  reparo pelo ID
  reparoRouter.get('/reparo/:id', (req, res) => {
    const reparoId = req.params.id;
    reparo.findOne({ where: { i_reparo_idRepair: reparoId }})
      .then(reparo => {
        if (!reparo) {
          res.status(404).send("reparo não encontrado");
          
        } else {
          res.json(reparo);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  reparo: " + error.message);
      });
  });
  
  // Rota para cadastrar uma  nova reparo
  reparoRouter.post('/reparo', (req, res) => {
    reparo.create(req.body)
    .then(() => res.send("reparo cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar reparo: " + error.message));
  });
  
  // Rota para atualizar  uma reparo pelo ID.
  reparoRouter.put('/reparo/:id', (req, res) => {
    const reparoId = req.params.id;
    reparo.update(req.body, { where: { i_reparo_idRepair: reparoId } })
    .then(() => res.send("reparo atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar reparo: " + error.message));
  });
  
  // Rota para deletar uma  reparo
  reparoRouter.delete('/reparo/:id', (req, res) => {
    const reparoId = req.params.id;
    reparo.destroy({ where: { i_reparo_idRepair: reparoId } })
    .then(() => res.send("reparo deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar reparo: " + error.message));
  });
  
  export default reparoRouter;
  