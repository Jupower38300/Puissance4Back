import express, { Express } from "express"
const app: Express = express()
const port = 5000
import path from 'path'

const front = path.normalize(path.join(__dirname, '..','..','front'))
console.log(`Serve ${front}`)

app.use(express.json())
app.use('/', express.static(front))
app.get('/api', getApi)
app.get('/api/wof', getApiWof)
app.post('/api/wof', postApiWof)

app.listen(port, ()=>{
    console.log(`Serveur démarré sur le port ${port}`)
})