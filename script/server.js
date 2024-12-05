import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path, { join } from 'path';
import session from 'express-session'; 
import db from '../models/db.js';
import multer from 'multer';
import fs from 'fs/promises';

// Importação de modelos
import abastecimentoModelo from '../models/abastecimentoData.js';
import agenda from '../models/agendaData.js';
import agendamento from '../models/agendamentoData.js';
import carroAbastecimento from '../models/carroAbastecimentoData.js';
import carro from '../models/carroData.js';
import contratoCarro from '../models/contratoCarroData.js';
import custosCarro from '../models/custosCarroData.js';
import comida from '../models/refeicaoData.js';
import diario from '../models/diarioData.js';
import reparo from '../models/reparoData.js';
import usuario from '../models/usuarioData.js';
import usuarioVisita from '../models/usuarioVisitaData.js';
import entrega from '../models/entregaData.js';

// Importações de Rotas
import userRouter from '../routes/acessoRoutes.js';
import agendamentoRouter from '../routes/agendamentoRoutes.js';
import agendaRouter from '../routes/agendaRoutes.js';
import carroAbastecimentoRouter from '../routes/abastecimentoRoutes.js';
import entregaRouter from '../routes/entregaRoutes.js';
import carRouter from '../routes/carroRoutes.js';
import carContract from '../routes/contratoRoutes.js';
import carCosts from '../routes/custosRouter.js';
import diarioRouter from '../routes/diarioRoutes.js';
import comidaRouter from '../routes/refeicaoRoutes.js';
import reparoRouter from '../routes/reparoRoutes.js';
import usuarioVisitaRouter from '../routes/usuarioVisitaRoutes.js';
import relatorioRouter from '../routes/relatorioRoutes.js';
import abastecimentoRouter from '../routes/abastecimentoRoutes.js';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json('Erro no servidor!');
});

// Configuração de sessão
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina 'secure' para true em produção com HTTPS
}));



// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexão com o banco de dados e sincronização dos modelos
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conectado com sucesso ao banco de dados!");
    await db.sequelize.sync({ force: false});
    console.log("Modelos sincronizados com sucesso!");
  } catch (error) {
    console.error("Falha ao se conectar ao banco de dados ou sincronizar modelos:", error);
  }
})();

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/models', express.static(path.join(__dirname, 'models')));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`Requisição ${req.method} para ${req.url}`);
  next();
});

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// configuração de multer ----------------------------------------
await fs.mkdir(path.join(__dirname, '/uploads'),{ recursive: true});
const storage= multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 160);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage});


// --------------------------------------------------------------------Area de Rotas----------------------------------------------------------------------------


// Rotas para cada tabela
app.use('/abastecimento', abastecimentoRouter);
app.use('/agenda', agendaRouter);
app.use('/acesso', userRouter);
app.use('/contratoCarro', carContract);
app.use('/custoFixo', carCosts);
app.use('/carro', carRouter);
app.use('/food', comidaRouter);
app.use('/agendamento', agendamentoRouter);
app.use('/entrega', entregaRouter);
app.use('/relatorio', relatorioRouter);
app.use('/reparo', reparoRouter);
app.use('/diario', diarioRouter);


// Rota de abastecimento
app.post('/abastecimento', upload.single('imagem'), async (req, res) => {

  const { descricao, carro, valor, pLitro, data } = req.body;
  
  if(!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada");
    return res.status(401).json('Usuário não autenticado.');
  }

  const userId = req.session.userId;
  const Qtda = (valor / pLitro);

  try {
      const imagemAbast =  req.file ? await fs.readFile(path.join(req.file.path)) : null

      await abastecimentoModelo.create ({
        s_abastecimento_fuelDescription : descricao,
        dec_abastecimento_fuelPrice : parseFloat(valor),
        dec_abastecimento_priceLiter : parseFloat(pLitro),
        d_abastecimento_fuelDate : new Date(data),
        l_abastecimento_fuelImg : imagemAbast,
        i_abastecimento_idCar : carro,
        i_abastecimento_qtdFuel : Math.round(Qtda),
        i_abastecimento_usuario_key : userId
      });
      res.status(200).json('Abastecimento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar abastecimento:', error);
      res.status(500).json('Erro ao criar abastecimento');
    }
});


// Rota de alimentação
app.post('/comida', upload.single('imagem'), async (req, res) => {
  
  const {descricao, valor, data } = req.body;

  if(!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada");
    return res.status(401).json('Usuário não autenticado.');
  }  

  const userId = req.session.userId;
  req.body.i_comida_usuario_key = userId;

  try {
      const imagemCom = req.file ? await fs.readFile(path.join(req.file.path)) : null;

      await comida.create ({
        s_comida_descriptionFood : descricao,
        dec_comida_valueFood : valor,
        d_comida_dateFood : new Date(data),
        l_comida_imgFood : imagemCom,
        i_comida_usuario_key : req.body.i_comida_usuario_key
      });
      res.status(200).json('Cadastro de Alimentação criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar cadastro de Alimentação:', error);
      res.status(500).json('Erro ao criar cadastro de Alimentação');
    }
});


// Rota de agenda

app.get('/agenda', async (req, res) => {

  try {
    const agendas = await agenda.findAll();
    res.json(agendas);
  } catch (error) {
    console.error('Erro ao buscar agenda:', error);
    res.status(500).json({erro: 'Erro ao buscar agenda'});
  }
});


app.post('/agenda', async (req, res) => {
  const { nome, startDate, startTime, deliverEndDate, originSelect, km_initial, carSelect } = req.body;

  if (!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada.");
    return res.status(401).json('Usuário não autenticado.');
  }

  const userId = req.session.userId;

  try {
      console.log("Dados recebidos do formulário:", req.body);

      const carroSelecionado = carSelect;   
      console.log("Carro selecionado:", carroSelecionado);
     

      if (!carroSelecionado){
        return res.status(400).json('Carro selecionado não encontrado.');
      }


    const novoAgendamento = await agenda.create({
      s_agenda_nameSchedule: nome,
      d_agenda_startDate: startDate,
      d_agenda_startTime: startTime,
      d_agenda_deliverEndDate: deliverEndDate,
      s_agenda_originSelect: originSelect,
      i_agenda_kmInitial: km_initial,
      s_agenda_scheduleCar: carroSelecionado,
      d_agenda_createdAt: new Date(),
      d_agenda_updateAt: new Date(),
      i_agenda_usuario: userId,
      i_agenda_agendamento: null
    });

    await novoAgendamento.update({
      i_agenda_agendamento: novoAgendamento.i_agenda_idSchedule
    });
    //res.status(200).json('Formulário recebido com sucesso!');
    res.redirect('/vamoAgenda');
    

  } catch (error) {
    console.error("Erro ao receber formulário.", error);
    res.status(500).json('Erro ao armazenar formulário');
  }
});


//Rota de agendamentos
app.get('/agendamento', async (req,res) => {
  try {
        const userId = req.session.userId;
    
        const agendamentos = await agenda.findAll({
            where: {
              i_agenda_usuario_user: userId
            }
        });
    console.log(agendamentos);

  res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json("Erro ao buscar agendamentos.");
  }
});


// Rota de cadastro de Acesso
app.post('/acesso', async (req, res) => {
  const { nome, sobrenome, senha, numeroHabilitacao, orgaoExpedidor, validadeHabilitacao } = req.body;

  if (!nome || !sobrenome || !senha || !numeroHabilitacao || !orgaoExpedidor || !validadeHabilitacao) {
    console.error('Erro: Dados inválidos ou incompletos fornecidos.');
    return res.status(400).json('Dados inválidos ou incompletos fornecidos.');
  }

  try {
    await acesso.create({
      s_usuario_name : nome,
      s_usuario_secondName : sobrenome,
      s_usuario_password : senha,
      i_usuario_licenseDriving : numeroHabilitacao,
      s_usuario_sectorShipping : orgaoExpedidor,
      dt_usuario_dateExpiration : validadeHabilitacao
    });
    res.status(200).json('Acesso criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar acesso:', error);
    res.status(500).json('Erro ao criar acesso');
  }
});

// Rota de entrega
app.post('/entrega', async (req, res) => {
  const { nome, deliverEndDate, carSelect, agendaId } = req.body;

  if (!agendaId) {
      return res.status(400).json({ error: 'ID de agendamento não fornecido' });
  }

  try {
      const novaEntrega = await Entrega.create({
          s_entrega_nameSchedule: nome,
          d_entrega_deliverEndDate: deliverEndDate,
          s_entrega_scheduleCar: carSelect,
          i_agenda_agendamento: agendaId // Relaciona com o agendamento
      });

      res.status(201).json({
          message: 'Entrega criada com sucesso!',
          entrega: novaEntrega
      });
  } catch (error) {
      console.error('Erro ao criar entrega:', error);
      res.status(500).json({ error: 'Erro ao criar entrega' });
  }
});


// Rota de Informações do Carro
app.post('/carro', async (req, res) => {
  const { nomeCarro, placa, anoFabricacao, capacidadeTanque, mediaConsumo } = req.body;

  // Verifique se os dados foram recebidos corretamente
  if (!nomeCarro || !placa || !anoFabricacao || !capacidadeTanque || !mediaConsumo) {
    return res.status(400).json('Dados incompletos');
  }

  try {
    await carro.create({
      s_carro_model: nomeCarro,
      s_carro_plate: placa,
      d_carro_manufactureYear: anoFabricacao,
      i_carro_fuelTank: capacidadeTanque,
      i_carro_consumptionAverage: mediaConsumo
    });
    res.status(201).json('Carro criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar carro:', error.message); // Mostrando mensagem de erro
    res.status(500).json('Erro ao criar carro');
  }
});


// Rota de Contrato do Carro
app.post('/contratoCarro', async (req, res) => {
  const { dataInicio, dataTermino, usuarioResponsavel, codigoReserva, codigoAluguel, tarifaContrato, kmExcendente, franquia } = req.body;

  try {
    await contratoCarro.create({
      d_contratoCarro_startDateRental : dataInicio,
      d_contratoCarro_endDateRental : dataTermino,
      s_contratoCarro_responsible : usuarioResponsavel,
      s_contratoCarro_reservationCode : codigoReserva,
      s_contratoCarro_contractRental : codigoAluguel,
      i_contratoCarro_rateMonthly : tarifaContrato,
      dec_contratoCarro_restKm : kmExcendente,
      i_contratoCarro_FranchiseKm : franquia
    });
    res.status(200).json('Contrato criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar contrato:', error);
    res.status(500).json('Erro ao criar contrato');
  }
});


// Rota de Custos do Carro
app.post('/custofixo', async (req, res) => {
  const { limiteReparos, danosTerceiros, perdaTotal, inicioSeguroVigencia, fimSeguroVigencia, aluguelKm} = req.body;

  try {
    await custosCarro.create({
      dec_custosCarro_repairLimitValue : limiteReparos,
      dec_custosCarro_damageOther : danosTerceiros,
      dec_custosCarro_totalLoss : perdaTotal,
      d_custosCarro_startDateSafe : inicioSeguroVigencia,
      d_custosCarro_endDateSafe : fimSeguroVigencia,
      i_custosCarro_rentKm : aluguelKm 
  });
    res.status(200).json('Custos criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar custos:', error);
    res.status(500).json('Erro ao criar custos');
  }
});


// Rota de Diário
app.post('/diario', async (req, res) => {

  const { indicador, texto } = req.body;

  if(!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada");
    return res.status(401).json('Usuário não autenticado.');
  }  
  const userId = req.session.userId;

  try {
      await diario.create({
      i_diario_motivo : indicador,
      s_diario_descricao : texto,
      s_diario_usuarioKey : userId,
      
    });
    res.status(200).json('Diário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar diário:', error);
    res.status(500).json('Erro ao criar diário');
  }
});


// Rota de login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await usuario.findOne({
      where: {
        s_usuario_name: name,
        s_usuario_password: password
      }
    });
    console.log('Resultado da consulta:', user);
    
    if (user) {
      req.session.userId = user.i_usuario_user; 
      res.status(200).json('Login bem-sucedido');
    } else {
      res.status(401).json('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json('Erro interno do servidor');
  }
});

// Rota de Reparos
app.post('/reparo', upload.single('imagem'), async (req, res) => {
  
  const { descricao, valor, data} = req.body;

  if(!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada");
    return res.status(401).json('Usuário não autenticado.');
  }

  const userId = req.session.userId;

  try {
      const imagemRep = req.file ? await fs.readFile(req.file.path) : null;

      await reparo.create({
        s_reparo_descriptionRepair : descricao,
        dec_reparo_prideRepair : valor,
        d_reparo_dateRepair: new Date(data),
        l_reparo_imgRepair : imagemRep,
        i_reparo_usuario_key : userId
    });
    res.status(200).json('Reparo criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar reparo:', error);
    res.status(500).json('Erro ao criar reparo');
  }
});


// Rota de Usuário Visita
app.post('/usuarioVisita', async (req, res) => {
  const { usuario, data, descricao } = req.body;

  try {
    await usuarioVisita.create({
      s_usuarioVisita_usuario : usuario,
      d_usuarioVisita_data : data,
      s_usuarioVisita_descricao : descricao
    });
    res.status(200).json('Usuário Visita criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar Usuário Visita:', error);
    res.status(500).json('Erro ao criar Usuário Visita');
  }
});



// ----------------------------------------------R O T A S------------------------------------------------------------//

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoInicial.html'));
});

// Rotas para servir arquivos HTML estáticos

app.get('/vamoAbastecimento', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoAbastecimento.html'));
});

app.get('/vamoAgenda', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoAgenda.html'));
});

app.get('/vamoCalendario', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoCalendario.html'));
});

app.get('/vamoCalendario2', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoCalendario2.html'));
});

app.get('/vamoDashboard', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoDashboard.html'));
});

app.get('/vamoDiario', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoDiario.html'));
});

app.get('/vamoEntrega', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoEntrega.html'));
});

app.get('/vamoGerencia', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoGerencia.html'));
});

app.get('/vamoInformado', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoInformado.html'));
});

app.get('/vamoLogin', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoLogin.html'));
});

app.get('/vamoMapa', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoMapa.html'));
});

app.get('/vamoRefeicao', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoRefeicao.html'));
});

app.get('/vamoRelatorio', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoRelatorio.html'));
});

app.get('/vamoReparos', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoReparos.html'));
});





// ---------------------------------------------------------------------------------------------------------------//

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
