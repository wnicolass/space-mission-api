import express, { Express } from 'express';
import morgan from 'morgan';
import v1Router from './routes/v1/v1.router';

function createApp(): Express {
  const app: Express = express();

  (function middlewares(): void {
    app.use(morgan('dev'));
    app.use(express.json());
  })();

  (function routes(): void {
    app.use('/v1', v1Router);
  })();

  return app;
}

export default createApp();
