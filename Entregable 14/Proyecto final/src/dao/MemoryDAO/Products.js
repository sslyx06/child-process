import MemoryContainer from "./MemoryContainer.js";
import Carts from "./Carts.js";
let cartsManager = new Carts();
export default class Products extends MemoryContainer{

    save = async(product) =>{   
        let datenow = new Date();
        function generateDatabaseDateTime(date) {
        return date.toISOString().replace("T"," ").substring(0, 19);
        }
            try {
                let lista = await this.getAll();
                if(lista.length===0){
                    product.id= 1;
                    product.code=101;
                    product.timestamp= generateDatabaseDateTime(datenow);
                    console.log(product)
                    lista.push(product);
                }else{
                    product.id = lista[lista.length-1].id+1
                    product.code = lista[lista.length-1].id+101
                    product.timestamp= generateDatabaseDateTime(datenow);
                    lista.push(product)
                    console.log(product)
                }
            } catch (error) {
                console.log("Hay un error: "+ error )
            }
    }
    update = async(obj) =>{
        try{
        let arr = await this.getAll()

        arr.map(function(dato){
            if(dato.id == obj.id){
                dato.name = obj.name;
                dato.price = obj.price;
                dato.thumbnail = obj.thumbnail;
                dato.description = obj.description;
                dato.stock = obj.stock;
            }
        })
        this.data = arr;
        return arr;
        }catch(error){
            return `Hay un error o se a mandaod un producto invalido`
        }
        
    }
}