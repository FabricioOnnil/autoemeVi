import Sequelize from 'sequelize';

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize('vamomv', 'root', '8mtkjg', {
    host: "localhost",
    dialect: 'mysql'
});

// Teste de autenticação
sequelize.authenticate()
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados!");
  })
  .catch((error) => {
    console.error("Falha ao se conectar ao banco de dados:", error.message);
  });


  export default {
    Sequelize: Sequelize,
    sequelize: sequelize
  };

  
  