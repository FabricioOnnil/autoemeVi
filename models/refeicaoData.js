// models/Food.mjs
import { DataTypes } from 'sequelize';
import db from './db.js';

const comida = db.sequelize.define('comida', {
  //Identificador da linha da tabela comida.
  i_comida_idFood: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  //Descrição da compra de comida.
  s_comida_descriptionFood: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  //Valor da refeição. 
  dec_comida_valueFood: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: true,
  },

  //Data da compra da refeição.
  d_comida_dateFood: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  //Imagem da Nota Fiscal
  l_comida_imgFood: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },

  //Data da criação da linha. 
  d_comida_createdAt : {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },

  //Data da atualização da linha. 
  d_comida_updateAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },

  i_comida_agendaId: {
    type:DataTypes.INTEGER,
    allowNull: true,
  },  
  }, {
    tableName: 'comida',
    timestamps: false, 
});

export default comida;
