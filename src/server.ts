import express from 'express';

const app = express();

import routes from './routes'
import './databases/connection'


app.use(express.json());
app.use(routes)

app.listen(3333, () => console.log('Servidor Rodando!!!!'))