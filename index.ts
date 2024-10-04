import express, { Express } from 'express'
const app: Express = express()
const port = 5000
import path from 'path'
import { createGame, getGames } from "./controllers/player.controller"

const front = path.normalize(path.join(__dirname, '..','..','Puissance-4_Puissance_a_4'))
console.log(`Serve ${front}`)

app.use(express.json())
app.use('/', express.static(front))
app.get('/games', getGames)
app.post('/games', createGame)

app.use(express.json());
app.use('/', express.static(front));
app.get('/sign-up', signIn);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
});
