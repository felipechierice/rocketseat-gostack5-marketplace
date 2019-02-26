const Ad = require('../models/Ad');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const PurchaseMail = require('../jobs/PurchaseMail');
const Queue = require('../services/Queue');

/** Controller de compra */
class PurchaseController {
  /**
   * Salva uma inteção de compra
   * @param {object} req Objeto de requisição do express
   * @param {object} res Objeto de resposta do express
   */
  async store(req, res) {
    const {ad, content} = req.body;
    const purchaseAd = await Ad.findById(ad).populate('author');

    if (!!purchaseAd.purchasedBy) {
      return res
          .status(400)
          .json({error: 'This product had already been sold.'});
    }

    const user = await User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    const purchase = await Purchase.create({...req.body, user: req.userId});
    return res.json(purchase);
  }
}

module.exports = new PurchaseController();
