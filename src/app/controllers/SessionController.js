const User = require('../models/User');

/** Controller de sessões */
class SessionController {
  /**
   * Cria um token JWT
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async store(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({error: 'User not found.'});
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({error: 'Invalid password.'});
    }

    return res.json({user, token: User.generateToken(user)});
  }
}

module.exports = new SessionController();
