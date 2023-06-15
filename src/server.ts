import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    sanityCheck: 'ok',
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
