import mongoose from "mongoose";
import MongoDBContainer from "./mongoDBContainer.js";

const collections = 'products'
const productsSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    stock:Number,
    thumbnail:String,
    id:Number,
    code:Number,
    timestamp:String
})

export default class Products extends MongoDBContainer{
    constructor(){
        super(collections,productsSchema)
    }
    save = async(product) =>{   
        let datenow = new Date();
        function generateDatabaseDateTime(date) {
        return date.toISOString().replace("T"," ").substring(0, 19);
        }
            try {
                if(await this.model.countDocuments() ===0){
                    product.id= 1;
                    product.code=101;
                    product.timestamp= generateDatabaseDateTime(datenow);
                    console.log(product)
                   await this.model.create(product)
                }else{
                    let id = await this.model.find({},{id:1,_id:0}).sort({id:-1}).limit(1)
                    let code = await this.model.find({},{code:1,_id:0}).sort({code:-1}).limit(1)
                    product.id = id[0].id+1
                    product.code = code[0].code+1
                    product.timestamp= generateDatabaseDateTime(datenow);
                    console.log(product)
                    await this.model.create(product)
                }
            } catch (error) {
                console.log("Hay un error: "+ error )
            }
    }
    update = async(obj) =>{
        try{
            let result = await this.model.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,price:obj.price,stock:obj.stock,thumbnail:obj.thumbnail}})
            console.log(result)
        return arr;
        }catch(error){
            return `Hay un error o se a mandaod un producto invalido`
        }
        
    }
}