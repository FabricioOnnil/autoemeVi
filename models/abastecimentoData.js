import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const abastecimentoModelo = db.sequelize.define('abastecimento', {
    // Identificador da linha da tabela de abastecimento. 1
    i_abastecimento_idFuel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    //Descrição para o abastecimento. 2
    s_abastecimento_fuelDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Valor total do Abastecimento. 3
    dec_abastecimento_fuelPrice:{
        type: DataTypes.DECIMAL(9,2),
        allowNull: true
    },
    
    //Valor total do Abastecimento. 4
    dec_abastecimento_priceLiter: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: true
    },

    //Data do Abastecimento. 5
    d_abastecimento_fuelDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    //Imagem da Nota Fiscal. 6
    l_abastecimento_fuelImg: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },

    //Chave Estrangeira do Id do Carro escolhido. 7
    carro_i_carro_idcar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //Quantidade do abastecimento. 8
    i_abastecimento_qtdFuel: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //Data da criação da linha. 9
    d_abastecimento_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    //Data de atualização da linha. 10
    d_abastecimento_updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    //Chave estrangeira entre o Usuario e o abastecimento. 11
    i_abastecimento_usuario_key: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    },
    {
       tableName: 'abastecimento',
       timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default abastecimentoModelo;