const Ad = require('../models/Ad');

/** Controller de anúncios */
class AdController {
  /**
   * Lista anúncios
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async index(req, res) {
    const filters = {
      purchasedBy: {$exists: false},
    };

    if (req.query.min_price || req.query.max_price) {
      filters.price = {};

      if (req.query.min_price) {
        filters.price.$gte = req.query.min_price;
      }

      if (req.query.max_price) {
        filters.price.$lte = req.query.max_price;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i');
    }

    const ads = await Ad.paginate(
        filters,
        {},
        {
          page: req.params.page || 1,
          limit: 20,
          sort: '-createdAt',
        }
    );
    return res.json(ads);
  }

  /**
   * Exibe anúncio
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async show(req, res) {
    const ad = await Ad.findById(req.params.id);
    return res.json(ad);
  }

  /**
   * Salva anúncio
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async store(req, res) {
    const ad = await Ad.create({...req.body, author: req.userId});
    return res.json(ad);
  }

  /**
   * Atualiza anúncio
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async update(req, res) {
    const ad = await Ad.findById(req.params.id);

    if (ad.author !== req.userId) {
      return res
          .status(401)
          .json({error: 'You\'re not the owner of this product.'});
    }

    if (!!req.body.purchasedBy && !!ad.purchasedBy) {
      return res
          .status(400)
          .json({error: 'This ad had already been purchased.'});
    }

    ad = {...ad, ...req.body};
    await ad.save();

    return res.json(ad);
  }

  /**
   * Apaga anúncio
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);
    return res.send();
  }
}

module.exports = new AdController();
