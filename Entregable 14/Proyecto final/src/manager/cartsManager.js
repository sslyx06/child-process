import fs from 'fs';


const path = './files/carts.json'

class Contenedor{
    getAll = async() =>{
        try {
            if(fs.existsSync(path)){      
                let fileData = await fs.promises.readFile(path,'utf-8');
                let lista = JSON.parse(fileData);
                return lista;
            }else{
                return [];
            }
        } catch (error) {
            console.log("Hay un error " + error)
        }
    }

    createCart = async() =>{
        try {
            let producto = {}
            let datenow = new Date();
            function generateDatabaseDateTime(date) {
            return date.toISOString().replace("T"," ").substring(0, 19);
            }
            let lista = await this.getAll();
            if(lista.length===0){
                producto.id= 1;
                producto.timestamp= generateDatabaseDateTime(datenow);
                producto.products=[];
                lista.push(producto);
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'));
                return producto.id

            }else{
                producto.id = lista[lista.length-1].id+1
                producto.timestamp= generateDatabaseDateTime(datenow);
                producto.products=[];
                lista.push(producto)
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'))
                return `${producto.id}`
            }
        } catch (error) {
            return "Hay un error o no has creado tu cart"
        }
    }

    getById = async(idNumber) =>{
        try {
            const data = await this.getAll();
            if(data.id !=idNumber){
                return data.find((element) => element.id == idNumber)
            }else{
                console.log("null")
            }

        } catch (error) {
            console.log("Hay un error: " + error)
        }
    }
    deleteById = async(idDelete) =>{
        try {
            const arr = await this.getAll()
            if (arr[arr.length-1].id>=idDelete) {
                const borrar = arr.filter((item) => item.id != idDelete)
                await fs.promises.writeFile(path, JSON.stringify(borrar,null,'\t'))
            } else {
                console.log("El id pedido no existe")
            }
        } catch (error) {
            console.log("Hay un error:" + error)
        }
    }
    deleteAll = async() =>{
        try {
            await fs.promises.unlink(path);
            console.log("Datos Borrados")
        } catch (error) {
            console.log("Hay un error: " + error)
        }
    }
    getRandom = async() =>{
        try {
            const arr = await this.getAll()
            let numeroRandom = Math.floor(Math.random()*arr.length+1)
            return (arr.find((element) => element.id == numeroRandom))
        } catch (error) {
            console.log("Hay un error" + error )
        }
    }
    update = async(obj,cid) =>{
        try {
            let arr = await this.getAll()
            let products = obj.products;
            let id = cid.cid
            arr.map(function(dato){
                if(dato.id == id){
    
                    dato.products = products
                }
            })
            await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        } catch (error) {
            return `Hay un error o se a mandaod un producto invalido`
        }
       
    }
    addProduct = async(info) =>{
        try {
            let arr = await this.getAll()
            let product = await this.getById(info.cid)
            let productsList = Object.values(product.products).find(obj => obj.product == info.pid)
            const productsInCartsFound = product.products
            const ProductItemInCarts = productsInCartsFound.find(item=> item.id === parseInt(info.pid))
    
            if(!productsList){
                  arr.map(function(dato){
                    if(dato.id == info.cid){
                      dato.products.push({product:info.pid,quantity:1})
                    }
                    fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
                })
                return "Producto Agregado"
            }else{ 
                const newProduct = {
                    product: info.pid,
                    quantity: productsList.quantity+1,
                  }
                  product.products.push(newProduct)
                  await this.update(product,info)
                  let deleteOld = Object.values(product.products).filter((item) => item != productsList);
                  arr.map(function(dato){
                    if(dato.id == info.cid){
                        dato.products = deleteOld;
                    }})
                    await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
                    return "Se agrego 1 a la cantidad del producto ya que estaba agregado"
            } 
        } catch (error) {
            return `Hay un error, o el carrito o el producto puesto no existen. Recuerde el modo de añadir "http://localhost:8080/api/carts/:IDPRODCUT/products/:IDCART"`
        }

    }
    deleteByCidAndPid = async(info) =>{
        try {
            const data = await this.getAll();
            let product = await this.getById(info.cid)
            let productsList = Object.values(product.products).filter((item) => item.product != info.pid);
            data.map(function(dato){
                        if(dato.id == info.cid){
                            dato.products = productsList
                        }})
            await fs.promises.writeFile(path,JSON.stringify(data,null,'\t'));
            return `Se elimino exitosamente`;
        } catch (error) {
            return `Hay un error o se a mandaod un producto invalido`
        }
    }
    
}

export default Contenedor;
