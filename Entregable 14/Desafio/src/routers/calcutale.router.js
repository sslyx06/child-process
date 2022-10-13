import { Router } from "express";
import { fork } from "child_process";
const router = Router()
let a  = 123
router.get('/',(req,res)=>{
    const child = fork('./calculate.js')
    if(!req.query.cant) child.send(100000000) 
    else child.send(req.query.cant)
    child.on('message',val=>{
        res.send(`El reusltado es ${val}`)
    })
})

export default router