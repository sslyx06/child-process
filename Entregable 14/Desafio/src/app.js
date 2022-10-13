import express from 'express'
import minimist from 'minimist'
import calculateRandom from './routers/calcutale.router.js'
import fork from 'child_process'

const app = express()
const PORT = 8080
const args = minimist(process.argv.slice(2));
const server = app.listen(PORT,console.log(`Lisening on ${PORT}`))


app.get('/',(req,res)=>{
    res.send('En server Rutas: <br>/info  y  /api/randoms')
})

app.get('/info',(req,res)=>{
    res.send(`________Argumentos de entrada : ${Object.values(args)} <br>________Nombre de la plataforma(Sistema operativo): ${process.platform}<br>________ Version de node.js: ${process.version}<br>________ Memoria total reservada: ${process.memoryUsage().rss} <br>________ Path de ejecucion: ${process.execPath}<br>________  Process id: ${process.pid}<br>________ Carpeta del proyecto: ${process.argv[1]}`)
})

app.use('/api/randoms',calculateRandom)