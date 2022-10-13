process.on('message',info=>{
    //console.log(info)
    let listNumeros = []
    let constador = 1
    let numeroPrimario = []
    let vecesRepetidos = []
    let final =[]
    for(let i=0;i<info;i++){
        let number = Math.floor(Math.random() * 1000)
        listNumeros.push(number)
    }
    let numeros = listNumeros.sort()
    for(let i = 0;i<numeros.length;i++){
        if(numeros[i+1]=== numeros[i]){
            constador++
        }else{
            numeroPrimario.push(numeros[i])
            vecesRepetidos.push(constador)
            constador = 1;
        }
    }
    for(let i = 0; i < numeroPrimario.length;i++){
        final.push(`El numero :${numeroPrimario[i]} Se repite:${vecesRepetidos[i]} veces<br>`)
    }   
    let result = Object.values(final)
    process.send(result)
})
