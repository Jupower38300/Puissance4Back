import express, { Express } from 'express'
const app: Express = express()
const port = 8080
import path from 'path'
import { createGame, getGames } from "./controllers/player.controller"
import { getRooms } from './controllers/room-controller'
import { postRooms } from './controllers/room-controller'
import mysql from "mysql2/promise";

const front = path.normalize(path.join(__dirname, '..', '..', 'Puissance-4_Puissance_a_4'))
console.log(`Serve ${front}`)

// Connexion à la BDD
export const POOL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'puissance4',
    port: 8889
});

app.use(express.json())
app.use('/', express.static(front))
app.get('/games', getGames)
app.post('/games', createGame)
//app.get('/sign-up', signIn);
app.get('/rooms', getRooms);
app.post('/rooms', postRooms);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
});
