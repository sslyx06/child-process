export default class MemoryContainer{
    constructor(){
        this.data = []
    }
    getAll = () =>{
        return this.data
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
            const data = await this.getAll()
            if (data[data.length-1].id>=idDelete) {
              this.data = data.filter((item) => item.id != idDelete)
            } else {
                console.log("El id pedido no existe")
            }
        } catch (error) {
            console.log("Hay un error:" + error)
        }        
    }
}