import express from 'express';
import usuario from '../models/usuarioData.js';

const userRouter = express.Router();

// Rota para buscar todos os usuario
userRouter.get('/usuario', (req, res) => {

  const usuarioId = req.params.id;
  console.log('ID do Usuário:', usuarioId);


  usuario.findOne({ where: { i_usuario_user: usuarioId } })
    .then((usuario) => {
      if (!usuario) {
        res.status(404).send("usuario não encontrado");
      } else {
        res.json(usuario);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar usuario:", error.message);  // Log de erro
      res.status(500).send("Erro ao buscar usuario: " + error.message);
    });
});


// Rota para buscar um usuario pelo ID
  userRouter.get('/usuario/:id', (req, res) => {
    const usuarioId = req.params.id;
    usuario.findOne({ where: { i_usuario_user: usuarioId } })
      .then((usuario) => {
        if (!usuario) {
          res.status(404).send("usuario não encontrado");
        } else {
          res.json(usuario);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao buscar usuario: " + error.message);
      });
  });

// Rota para cadastrar um novo usuario
userRouter.post('/usuario', (req, res) => {
  const { s_usuario_name, s_usuario_password } = req.body;

  if (!s_usuario_name || !s_usuario_password) {
    return res.status(400).send("Nome de usuario ou senha estão faltando.");
  }


usuario.create(req.body)
    .then(() => res.send("usuario cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar usuario: " + error.message));
});

//Rota para atualizar um usuario pelo ID
userRouter.put('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;
  const { s_usuario_name, s_usuario_password } = req.body;

  if (!usuarioId) {
    return res.status(400).send("ID de usuario está faltando.");
  }

  if (!s_usuario_name || !s_usuario_password) {
    return res.status(400).send("Nome de usuario ou senha estão faltando.");
  }

  usuario.update(req.body, { where: { i_usuario_user: usuarioId } })
    .then(() => res.send("usuario atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar usuario: " + error.message));
});

// Rota para deletar um usuario pelo ID
userRouter.delete('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;
  usuario.destroy({ where: {  i_usuario_user: usuarioId } })
    .then(() => res.send("usuario deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar usuario: " + error.message));
});


export default userRouter;
