import cors from 'cors';
import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import path from 'path';

export const app = express();
dotenv.config();

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/names', (req: Request, res: Response) => {
  res.json({
    message: 'This works',
    data: [{ name: 'Pablo' }, { name: 'Ensolvers' }],
  });
});
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

app.listen(4000, () => {
  console.log(`API is running on port: 4000`);
});
