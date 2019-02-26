require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const validate = require('express-validation');
const Youch = require('youch');
const Sentry = require('@sentry/node');

const databaseConfig = require('./config/database');
const sentryConfig = require('./config/sentry');

/** Classe principal do server */
class Server {
  /** @constructor */
  constructor() {
    this.express = express();

    this.sentry();
    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  /** Configura monitor de error Sentry */
  sentry() {
    Sentry.init(sentryConfig);
  }

  /** Configura database */
  database() {
    mongoose.connect(databaseConfig.uri, databaseConfig.options);
  }

  /** Aplica middlewares no express */
  middlewares() {
    this.express.use(express.json());
    this.express.use(Sentry.Handlers.requestHandler());
  }

  /** Carrega rotas da API */
  routes() {
    this.express.use(routes);
  }

  /** Lida com exceptions na aplicação */
  exception() {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler());
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);
        return res.json(await youch.toJSON());
      }

      return res
          .status(res.status || 500)
          .josn({error: 'Internal Server Error.'});
    });
  }
}

module.exports = new Server().express;
