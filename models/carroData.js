import { DataTypes } from 'sequelize';
import db from './db.js'; 

const sequelize = db.sequelize;

// Definição do modelo carro
const carro = sequelize.define('carro', {
    // id da tabela.
    i_carro_idcar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    //Modelo do carro.
    s_carro_model: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Placa do carro.
    s_carro_plate: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Ano de fabricação.
    d_carro_manufactureYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    // capacidade do Tanque de combustivel
    i_carro_fuelTank: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //média de consumo
    i_carro_consumptionAverage: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //Data de criação.
    d_carro_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    //Data da ultima atualização.
    d_carro_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    i_carro_agenda_id: {
        type: DataTypes.INTEGER,
        allowNull: true,

    }
    }, {
        tableName: 'carro',
        timestamps: true, 
        createdAt: 'd_carro_createdAt', 
        updatedAt: 'd_carro_updateAt'
    });


export default carro;
