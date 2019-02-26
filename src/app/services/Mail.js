const nodemailer = require('nodemailer');
const path = require('path');
const mailerConfig = require('../../config/mail');
const exphbs = require('express-handlebars');
const nmhbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport(mailerConfig);

transport.use(
    'compile',
    nmhbs({
      viewEngine: exphbs(),
      viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
      extName: '.hbs',
    })
);

module.exports = transport;
