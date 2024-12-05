import express from 'express';
import carro  from '../models/carroData.js';

const carRouter = express.Router();

//Rota para buscar todos os carros.
carRouter.get('/', async (req, res) => {

  try {
        const carros = await carro.findAll({
          attributes: [ 'i_carro_idcar', 's_carro_model', 's_carro_plate']
        });
        res.json(carros);
    } catch (error) {
      console.error('Erro ao buscar carros:', error.message);
      return res.status(500).json('Erro ao buscar carro.');
    }
  });

//Rota para buscar um carro pelo ID.
carRouter.get('/carro/:id', async (req, res) => {
  const carroId = req.params.id;
  try {
    const carroEncontrado = await carro.findOne({ where: { i_carro_idcar: carroId } });
    if(!carroEncontrado) {
        return res.status(404).json('Carro não encontrado.');
    }
        return res.json(carroEncontrado);
  } catch (error) {
      console.error('Erro ao buscar carro:', error.message);
      return res.status(500).json("Erro ao buscar carro: " + error.message);        
      }
    });

  // Rota para cadastrar um novo carro.
carRouter.post('/', async (req, res) => {

  const { s_carro_model, s_carro_plate} = req.body;
  if(!s_carro_model || !s_carro_plate) {
    return res.status(400).json("Dados incompletos para cadastrar o carro.");
  }

  try {
        const novoCarro = await carro.create(req.body);
        return res.status(201).json(`Carro cadastrado com sucesso! ID: ${novoCarro.i_carro_idcar}`);
  } catch (error) {
      console.error('Erro ao cadastrar carro:', error.message);
      return res.status(500).json("Erro ao cadastrar carro: " + error.message);
  }
});

//Rota para atualizar um carro pelo ID.
carRouter.put('/carro/:id', async (req, res) => {
  const carroId = req.params.id;

  req.body.d_carro_updateAt = new Date();

  try {
        const [atualizado] = await carro.update(req.body, { where: { i_carro_idcar: carroId } });
        if (atualizado) {
            return res.json("Carro atualizado com sucesso!");
        } 
        return res.status(404).json('Carro não encontrado.');
  } catch (error) {
        console.error('Erro ao atualizar carro:', error.message);
        return res.status(500).json("Erro ao atualizar carro: " + error.message );
  }
});

//Rota para deletar um carro pelo ID.
carRouter.delete('/carro/:id', async (req, res) => {
  const carroId = req.params.id;
  try {
        const deletado = await carro.destroy({ where: { i_carro_idcar: carroId } });
        if (deletado) {
          return res.json("Carro deletado com sucesso!");
        }
        return res.status(404).json('Carro não encontrado.');
  } catch (error) {
      console.error('Erro ao deletar carro:', error.message);
      return res.status(500).json("Erro ao deletar carro: " + error.message);
  }
});

export default carRouter;
