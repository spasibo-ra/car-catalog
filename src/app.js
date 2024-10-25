import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import session from 'express-session';

import path from 'node:path';

import router from './routers/router.js';

const __dirname = path.resolve();

class App {
  constructor(port) {
    this.#setEnviroment();
    this.express = express();
    this.express.set('port', port);
    this.#middleware();
    this.#setHandlebars();
    this.#routes();
  }

  #middleware() {
    this.express.set('etag', false);

    this.express.use(cors({ origin: '*' }));
    this.express.use(helmet({ contentSecurityPolicy: false }));
    this.express.use(compression());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({
      extended: true
    }));
    this.express.use(express.static('public'));
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use(cookieParser());
    this.express.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false
    }))
  }

  #setEnviroment() {
    dotenv.config({ path: ['.env.development', '.env.production'] });
  }


  #setHandlebars() {
    this.express.engine('handlebars', engine({
      defaultLayout: 'main',
      helpers: {
        isEqual: function(arg1, arg2, options) {
          return (arg1.toString() === arg2.toString()) ? options.fn(this) : options.inverse(this);
        },
        json: (context) => JSON.stringify(context),
      }
    }));
    this.express.set('view engine', 'handlebars');
    this.express.set('views', './views');
  }

  #routes() {
    this.express.use(router);
  }
}

export default App;