import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MenuJet API Server is running');
});

// Item routes
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
