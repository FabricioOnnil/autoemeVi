import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const agendamento = db.sequelize.define('agendamento', {
    //Identificador da tabela agendamento.
    i_agendamento_agendado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    //chave da agenda no agendamento.
    i_agendamento_agenda: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    //chave da entrega no agendamento.
    i_agendamento_entrega: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},{
    tableName: 'agendamento',
    timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
    
    });

export default agendamento;