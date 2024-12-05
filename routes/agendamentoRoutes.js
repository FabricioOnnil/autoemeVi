import express from 'express';
import agenda from '../models/agendaData.js';
import entrega from '../models/entregaData.js';

const agendamentoRouter = express.Router();

// Rota para obter todos os agendamentos
agendamentoRouter.get('/agendamento', async (req, res) => {

    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send("Usuário não autenticado");
    }
    try {
          const agendamentos = await agenda.findAll();
          res.json(agendamentos);

    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

// Rota para obter um agendamento pelo ID
agendamentoRouter.get('/agendamento/:id', async (req, res) => {
    const agendamentoId = req.params.id;

    try {

      const agendamento = await agenda.findOne({ where: { i_agenda_usuario_user: agendamentoId }});
    
      if (!agendamento) {
          return res.status(404).send("Agendamento não encontrado");
        } 
          res.json(agendamento);          
      } catch (error) {
        console.error("Erro ao obter agendamento:", error);
        res.status(500).send("Erro ao obter agendamento: " + error.message);
      }
});

// Rota para cadastrar um novo agendamento
agendamentoRouter.post('/agendamento', async (req, res) => {
  const userId = req.session.userId;
  if(!userId) {
    return res.status(401).send("Usuário não autenticado");
  }

  try {
      const novoAgendamento = await agenda.create(req.body);

      await entrega.create({
          s_entrega_nameDelivery: novoAgendamento.s_agenda_nameSchedule,
          d_entrega_deliveryEndDate: novoAgendamento.d_agenda_deliverEndDate,
          d_entrega_deliveryEndTime: novoAgendamento.d_agenda_startTime,
          s_entrega_destinySelect: novoAgendamento.s_agenda_originSelect,
          i_entrega_kmFinal: novoAgendamento.i_agenda_kmInitial,
          s_entrega_deliveryCar: novoAgendamento.s_agenda_scheduleCar,
          d_entrega_createdAt: new Date(), 
          i_entrega_agendamento: novoAgendamento.i_agenda_usuario_user 
      });

      res.send("Agendamento cadastrado com sucesso e dados copiados para entrega!");
    } catch (error) {
      res.status(500).send("Erro ao cadastrar agendamento ou inserir na tabela entrega: " + error.message);
    }
});


// Rota para atualizar um agendamento pelo ID
agendamentoRouter.put('/agendamento/:id', async (req, res) => {
    const agendamentoId = req.params.id;
    try {
          await agenda.update(req.body, { where: { i_agenda_usuario_user: agendamentoId } });
          res.send("Agendamento atualizado com sucesso!");
    } catch (error) {
       console.error("Erro ao deletar agendamento:", error);
       res.status(500).send("Erro ao atualizar agendamento: " + error.message);
    }
});

// Rota para deletar um agendamento
agendamentoRouter.delete('/agendamento/:id', async (req, res) => {
    const agendamentoId = req.params.id;
    try {
          await agenda.destroy({ where: { i_agenda_usuario_user: agendamentoId } });
          res.send("Agendamento deletado com sucesso!");
    } catch (error) { 
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).send("Erro ao deletar agendamento: " + error.message);
  }
});

export default agendamentoRouter;
