import {Router} from 'express';
import services from "../dao/index.js";


const router = Router();

router.get('/:cid/products',async(req,res)=>{
   let cid = req.params.cid
   if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
   if(parseInt(cid)<1) return res.status(404).send("No hay un carro con ese id")
   let list = await services.cartsService.getCartProducts(cid)
   res.send(list)
})

router.post('/',async(req,res)=>{
   let create = await services.cartsService.createCart()
   res.send(`El id de su carrito es ${create}`)
})
router.post('/:cid/products/:pid',async(req,res)=>{
   let info = req.params
   if(isNaN(info.pid)) return res.status(400).send({error:"El valor no es numerico o no existe"})
   let add = await services.cartsService.addProduct(info)
   res.send(add)
})


router.delete('/:cid',async(req,res)=>{
   let cid = req.params.cid
   if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
   await services.cartsService.deleteById(cid)
   res.send(`Carrito ${cid} eliminado con exito`)
})

router.delete('/:cid/products/:pid',async(req,res)=>{
   let cid = req.params
   if(isNaN(cid.cid)) return res.status(400).send({error:"El valor no es numerico"})
   let deleten = await services.cartsService.deleteByCidAndPid(cid)
   res.send(deleten)
})



export default router;