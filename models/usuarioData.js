import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const usuario = db.sequelize.define('usuario', { 
    //Identificador de linha da tabela de usuario.
    i_usuario_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    //Nome do usuario (que será usado para login)
    s_usuario_name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //Sobrenome para indetificação posterior.
    s_usuario_secondName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //Senha para acesso. 
    s_usuario_password: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //Documento de Habilitação.
    i_usuario_licenseDriving: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //Orgão expedidor do documento.
    s_usuario_sectorShipping: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //Data de validade do documento de habilitação.
    d_usuario_dateExpiration: {
      type: DataTypes.DATE,
      allowNull: true
    },

    //Data de criação da Linha.
    d_usuario_createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  
    //Data de atualização da Linha.
    d_usuario_updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },},
     {
        tableName: 'usuario',
        timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
  });


export default usuario;
