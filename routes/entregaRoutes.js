import express from 'express';
import entrega from '../models/entregaData.js';
import agenda from '../models/agendaData.js';

const entregaRouter = express.Router();

// Rota para obter todos os postos de entrega
entregaRouter.get('/', async (req, res) => {
  try {
    
    const entregas = await entrega.findAll()
      
        res.json(entregas);
      } catch (error) {
        res.status(500).send("Erro ao obter entrega: " + error.message);
      }
    });

  
  // Rota para obter uma  entrega pelo ID
  entregaRouter.get('/entrega/:id', async (req, res) => {

    const entregaId = req.params.id;
    try {
      
    const entregas = await entrega.findOne({ where: { i_entrega_idDelivery: entregaId }});
      
       if (!entregas) {
          res.status(404).send("entrega não encontrado");
          
        } else {
          res.json(entregas);
        }
      } catch(error) {
        res.status(500).send("Erro ao obter  entrega: " + error.message);
      }
  });


entregaRouter.post('/', async (req, res) => {
  const { i_agenda_idSchedule, d_agenda_deliverEndDate } = req.body;

  console.log("Dados Recebidos:", req.body);

  if(!i_agenda_idSchedule) {
      return res.status(400).json({ error: 'ID de agendamento não fornecido'});
  }

  try {
      // Atualiza os dados na tabela agenda
      await agenda.update ({ d_agenda_deliverEndDate },
             { where: { i_agenda_idSchedule }}
          
      );

      // Encontra o agendamento atualizado
      const agendamento = await agenda.findByPk(i_agenda_idSchedule);

      if (!agendamento) {
          return res.status(404).json({ error: 'Agendamento não encontrado' });
      }

      // Copia os dados da tabela agenda para a tabela entrega
      const novaEntrega = await entrega.create({
        s_entrega_nameDelivery: agendamento.s_agenda_nameSchedule,
        d_entrega_deliveryEndDate: agendamento.d_agenda_deliverEndDate,
        d_entrega_deliveryEndTime: agendamento.d_agenda_deliveryEndTime,
        s_entrega_destinySelect: agendamento.s_agenda_originSelect,
        i_entrega_kmFinal: agendamento.i_agenda_kmInitial, 
        s_entrega_deliveryCar: agendamento.s_agenda_scheduleCar,
        d_entrega_createdAt: new Date(), 
      });

      
      res.status(201).json({ message: 'Dados atualizados com sucesso e entregues.', novaEntrega });

  } catch (error) {
      console.error("Erro ao atualizar os dados ou inserir na tabela entrega:", error);
      res.status(500).json({ message: 'Erro ao atualizar os dados ou inserir na tabela entrega' });
  }
});


  // Rota para atualizar  uma entrega pelo ID.
  entregaRouter.put('/entrega/:id', async (req, res) => {
    const entregaId = req.params.id;

    try {
        const result = await entrega.update(req.body, { where: { i_entrega_idDelivery: entregaId } });
        if (result[0] === 0) {
            return res.status(404).send("Entrega não encontrada para atualizar");
        }
        res.send("Entrega atualizada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar entrega: " + error.message);
    }
});
  
  // Rota para deletar uma  entrega
  entregaRouter.delete('/entrega/:id', async (req, res) => {
    const entregaId = req.params.id;

    try {
        const result = await entrega.destroy({ where: { i_entrega_idDelivery: entregaId } });
        if (result === 0) {
            return res.status(404).send("Entrega não encontrada para deletar");
        }
        res.send("Entrega deletada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar entrega: " + error.message);
    }
});
  
  export default entregaRouter;
  