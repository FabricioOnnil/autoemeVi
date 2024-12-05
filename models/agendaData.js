import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const agenda = db.sequelize.define('agenda', {

  //Identificador da tabela agenda. 1
  i_agenda_idSchedule: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  //Nome responsavel pelo agendamento. 2
  s_agenda_nameSchedule: {
    type: DataTypes.STRING,
    allowNull: true
  },

  //Data inicial do agendamento. 3
  d_agenda_startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  
  //Hora planejada do agendamento. 4
  d_agenda_startTime: {
    type: DataTypes.TIME,
    allowNull: true
  },

  //Data planejada de Entrega. 5
  d_agenda_deliverEndDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },

  //Escritório de retirada do carro. 6
  s_agenda_originSelect: {
    type: DataTypes.STRING,
    allowNull: true
  },

  //Descrição da Rota. 7
  s_agenda_officeEnd: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Quilometragem inicial do carro. 8
  i_agenda_kmInitial: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  //Carro Selecionado. 9
  s_agenda_scheduleCar: {
    type: DataTypes.STRING,
    allowNull: true
  },

  //Data da criação da linha. 10
  d_agenda_createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },

  //Data da atualização da linha. 11
  d_agenda_updateAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  // conexão externa com a tabela usuario. 12
  i_agenda_usuario_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
    
  },
  
  // conexão externa com a tabela agendamento. 14
  i_agenda_agendado_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
    tableName: 'agenda',
    timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default agenda;
