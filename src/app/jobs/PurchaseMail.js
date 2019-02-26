const Mail = require('../services/Mail');

/** Classe do job de envio de email */
class PurchaseJob {
  /**
   * ID do job
   */
  get key() {
    return 'PurchaseMail';
  }

  /**
   *
   * @param {object} job Objeto de job do Kue
   * @param {object} done Callback
   */
  async handle(job, done) {
    const {ad, content, user} = job.data;
    await Mail.sendMail({
      from: '"Felipe Chierice" <fschierice@gmail.com>',
      to: ad.author.email,
      subject: `Soliticação de compra: ${ad.title}`,
      template: 'purchase',
      context: {user, content, ad},
    });
    return done();
  }
}

module.exports = new PurchaseJob();
