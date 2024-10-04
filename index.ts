import express, { Express } from 'express'
import cors from 'cors'
const app: Express = express()
const port: number = 5000
import path from 'path'
import { createGame, getGames } from "./controllers/player.controller"

const front = path.normalize(path.join(__dirname, '..','..','Puissance-4_Puissance_a_4'))
console.log(`Serve ${front}`)

app.use(cors());
app.use(express.json())
app.use('/', express.static(front))
app.get('/rooms', getGames)
app.post('/rooms', createGame)

app.listen(port, ()=>{
    console.log(`Serveur démarré sur le port ${port}`)
})