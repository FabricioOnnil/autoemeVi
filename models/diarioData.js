import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const diario = db.sequelize.define('diario', {
    //Identificador da tabela dirio.
    i_diario_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    i_diario_motivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
    s_diario_descricao: {
        type: DataTypes.STRING ('long'),
        allowNull: true,
    },

    d_diario_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    d_diario_updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    i_agenda_idSchedule: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    i_usuario_diario: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},{
tableName: 'diario',
timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically

});

export default diario;

