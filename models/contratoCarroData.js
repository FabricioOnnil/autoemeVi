import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição do contrato de aluguel do carro
const contratoCarro = sequelize.define('contratoCarro', {
    // id da tabela do contrato. 1
    i_contratoCarro_contratoId: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Data de inicio do Contrato do Carro
    d_contratoCarro_startDateRental: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Data de termino do Contrato do Carro
    d_contratoCarro_endDateRental: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Responsavel pelo Contrato
    s_contratoCarro_responsible: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Codigo de reserva do Carro
    s_contratoCarro_reservationCode: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Contrato de Aluguel
    s_contratoCarro_contractRental: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Taxa mensal do Aluguel
    i_contratoCarro_rateMonthly: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Valor por quilomentro excendente
    dec_contratoCarro_restKm: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },

    //Valor da Franquia de quilometro por Dia
    i_contratoCarro_FranchiseKm: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //Data da criação da Linha. 
    d_contratoCarro_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    // Data de Atualização da linha.
    d_contratoCarro_updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    // Id do carro no contrato
    i_contratoCarro_carro_idcar: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    }, 
    {
    tableName: 'contratoCarro',
    timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default contratoCarro