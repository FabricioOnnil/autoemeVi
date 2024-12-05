import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição de custos do carro
const custosCarro = sequelize.define('custosCarro', {
    // id da tabela de custos. 1
    i_custosCarro_custosId: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 

    // custo de limite para reparos Vv
    dec_custosCarro_repairLimitValue: {
        type:DataTypes.DECIMAL,
        allowNull: true
    },

    // Limite de custo para reparos de terceiros. Vv
    dec_custosCarro_damageOther: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },

    // Custo maximo de perda Total. Vv
    dec_custosCarro_totalLoss: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },

    // Data do inicio do contrato. Vv
    d_custosCarro_starDateSafe: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Data do fim do contrato. 
    d_custosCarro_endDateSafe: {
        type:DataTypes.DATE,
        allowNull: true
    },

    // Quilometragem de aluguel. Vv
    i_custosCarro_rentalKm: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    // Data de criação da Linha
    d_custosCarro_createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Data de atualização da Linha.
    d_custosCarro_updateAt: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Id de carro relacionado
    i_custosCarro_carro_idcar: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
}, 
{
tableName: 'custosCarro',
timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default custosCarro;