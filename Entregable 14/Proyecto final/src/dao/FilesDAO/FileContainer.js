import fs from 'fs'

export default class FileContainer{
    constructor(path){
        this.path = path
    }
    getAll = async() =>{
        try {
            if(fs.existsSync(this.path)){      
                let data = await fs.promises.readFile(this.path,'utf-8');
                let lista = JSON.parse(data);
                return lista;
            }else{
                return [];
            }
        } catch (error) {
            console.log("Warning error" + error)
        }
    }

    deleteById = async(idDelete) =>{
        try {
            const data = await this.getAll()
            if (data[data.length-1].id>=idDelete) {
                const borrar = data.filter((item) => item.id != idDelete)
                await fs.promises.writeFile(this.path, JSON.stringify(borrar,null,'\t'))
            } else {
                console.log("El id pedido no existe")
            }
        } catch (error) {
            console.log("Hay un error:" + error)
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
}