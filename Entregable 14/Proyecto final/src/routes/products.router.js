import {Router} from 'express';
import services from "../dao/index.js";
const admin = true;
const router = Router();

router.get('/',async(req,res)=>{
    let products= await services.productsService.getAll()
    res.send(products)
})

router.get('/pid',async(req,res)=>{
    let number = req.query.pid
    let productid = await services.productsService.getById(number)
    res.send(productid)
})

router.post('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let producto = req.body
    res.send({status:"succes", message:"Product Added"})
    await services.productsService.save(producto)
})

router.put('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let product = req.body
   await services.productsService.update(product)
})

router.delete('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let id = req.body
    res.send("Eliminado")
   await services.productsService.deleteById(id.delete)
})


export default router;