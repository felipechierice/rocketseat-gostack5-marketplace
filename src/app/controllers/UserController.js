const User = require('../models/User');

/** Controller de usuários */
class UserController {
  /**
   * Salva um usuário
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async store(req, res) {
    const {email} = req.body;

    if (await User.findOne({email})) {
      return res.status(400).json({
        error: 'Email already in use.',
      });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }
}

module.exports = new UserController();
