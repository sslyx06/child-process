import cartManager from "./cartsManager.js"
import fs from 'fs';
const path = './files/products.json'
const managerCart = new cartManager()
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

    save = async(producto) =>{
                let datenow = new Date();
                function generateDatabaseDateTime(date) {
                return date.toISOString().replace("T"," ").substring(0, 19);
                }
        try {
            let lista = await this.getAll();
            if(lista.length===0){
                producto.id= 1;
                producto.code=101;
                producto.timestamp= generateDatabaseDateTime(datenow);
                lista.push(producto);
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'));
            }else{
                producto.id = lista[lista.length-1].id+1
                producto.code = lista[lista.length-1].id+101
                producto.timestamp= generateDatabaseDateTime(datenow);
                lista.push(producto)
                console.log(producto)
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'))
            }
        } catch (error) {
            console.log("Hay un error: "+ error )
        }
    }

    getById = async(idNumber) =>{
        try {
            const data = await this.getAll();
            if(data.id !=idNumber){
                console.log(data.find((element) => element.id == idNumber))
                let info = data.find((element) => element.id == idNumber)
                return info
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
 
    update = async(obj) =>{
        try{
            let arr = await this.getAll()
        let id = obj.id;
        let title = obj.name; 
        let price = obj.price;
        let descripton = obj.description  
        let stock  = obj.stock
        let thumbnail = obj.thumbnail;
        arr.map(function(dato){
            if(dato.id == id){
                dato.name = title;
                dato.price = price;
                dato.thumbnail = thumbnail;
                dato.description = descripton;
                dato.stock = stock;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        console.log(arr)
        return arr;
        }catch(error){
            return `Hay un error o se a mandaod un producto invalido`
        }
        
    }
    getCartProducts = async(cid)=>{

        try {
            const data = await this.getAll();
            let product = await managerCart.getById(cid)
            let list= [];
            console.log("product.products : " , Object.values(product.products))
            Object.values(product.products).forEach((pid) => {
            let productos = data.find((element) => element.id == pid.product)
            list.push(productos)
        })
        console.log("list : ",list)
        return list
        } catch (error) {
            return `Hay un error o se a mandaod un producto invalido`
        }
    }
}

export default Contenedor;

