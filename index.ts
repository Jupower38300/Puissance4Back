import express, { Express } from 'express'
const app: Express = express();
const port = 8080;
import path from 'path'
import { createGame, getGames } from "./controllers/game.controller"

const front = path.normalize(path.join(__dirname, '..','..','Puissance-4_Puissance_a_4'))
console.log(`Serve ${front}`)

app.use(express.json())
app.use('/', express.static(front))
app.get('/games', getGames)
app.post('/games', createGame)

app.listen(port, ()=>{
    console.log(`Serveur démarré sur le port ${port}`)
})