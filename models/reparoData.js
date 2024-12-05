
import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const reparo = db.sequelize.define('reparo', {
    //Identificador de linha da tabela reparo. 
    i_reparo_idRepair: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    //Descrição do reparo. 
    s_reparo_descriptionRepair: {
        type: DataTypes.STRING, 
        allowNull: true    
    },

    //Valor do reparo.
    dec_reparo_prideRepair: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: true
    },

    //Data do reparo.
    d_reparo_dateRepair: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Imagem da Nota Fiscal de reparo.
    l_reparo_imgRepair: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },

    //Data de criação da linha.
    d_reparo_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    //Data de atualização da linha. 
    d_reparo_updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    i_reparo_usuario_key:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    i_carro_reparo_idcar: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    },
    {
        tableName: 'reparo',
        timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically

});


export default reparo;