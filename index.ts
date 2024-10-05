import express, { Express } from 'express';
import cors from 'cors';
const app: Express = express();
const port = 8081;
import path from 'path';
import { createGame, getGames } from './controllers/player.controller';
import { getRooms } from './controllers/room-controller';
import { postRooms } from './controllers/room-controller';
import mysql from 'mysql2/promise';
import { signIn, signUp } from './controllers/player-controller';

const front = path.normalize(
  path.join(__dirname, '..', '..', 'Puissance-4_Puissance_a_4')
);
console.log(`Serve ${front}`);

// Connexion à la BDD
export const POOL = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'puissance4',
  port: 8889,
});
app.use(cors());
app.use(express.json());
app.use('/', express.static(front));

//partie en cours
app.get('/games', getGames);
app.post('/games', createGame);

//inscription / connexion
app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

//salle de jeu
app.get('/rooms', getRooms);
app.post('/rooms', postRooms);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
