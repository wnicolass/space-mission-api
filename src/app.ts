import express, { Express } from 'express';
import morgan from 'morgan';
import serverErrorHandler from './middlewares/server-error-handler';
import v1Router from './routes/v1/v1.router';

function createApp(): Express {
  const app: Express = express();

  (async function middlewares(): Promise<void> {
    app.use(morgan('dev'));
    app.use(express.json());
  })();

  (function routes(): void {
    app.use('/v1', v1Router);
    app.use(serverErrorHandler);
  })();

  return app;
}

export default createApp();
