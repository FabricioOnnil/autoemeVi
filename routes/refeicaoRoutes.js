import express from 'express';
import comida from '../models/refeicaoData.js';

const comidaRouter = express.Router();

// Rota para buscar todas as refeições.
comidaRouter.get('/comida', (req, res) => {
    comida.findAll()
      .then((comida) => {
        res.json(comida);
      })
      .catch((error) => {
        res.status(500).send("Erro ao buscar refeição: " + error.message);
      });
  });
  
  // Rota para buscar uma refeição por ID.
  comidaRouter.get('/comida/:id', (req, res) => {
    const comidaId = req.params.id;
    comida,findOne({ where: { i_comida_idFood: comidaId } })
      .then((comida) => {
        if (!comida) {
          res.status(404).send("refeição não encontrada");
        } else {
          res.json(comida);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao buscar refeição: " + error.message);
      });
  });

//Rota para cadastrar uma nova refeição.
comidaRouter.post('/comida', (req, res) => {
  comida.create(req.body)
    .then(() => res.send("Refeição cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar refeição: " + error.message));
});

//Rota para atualizar uma refeição pelo ID.
comidaRouter.put('/comida/:id', (req, res) => {
  const comidaId = req.params.id;
  comida.update(req.body, { where: { i_comida_idFood: comidaId } })
    .then(() => res.send("Refeição atualizada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar refeição: " + error.message));
});

comidaRouter.delete('/comida/:id', (req, res) => {
  const comidaId = req.params.id;
  comida.destroy({ where: { i_comida_idFood: comidaId } })
    .then(() => res.send("Refeição deletada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar refeição: " + error.message));
});

export default comidaRouter;

