import cors from 'cors';
import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import indexRouter from './routes/indexRoutes';
import connectDb from './utils/db';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        iat: number;
        exp: number;
        name: string;
      };
    }
  }
}

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

connectDb();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API is running on port: ${port}`);
});
