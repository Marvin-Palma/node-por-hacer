


const fs=require('fs');
const colors= require('colors');

let listadoPorHacer=[];

const guardarDB=()=>{
    let data=JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err)=>{
        if(err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB=()=>{

    try{
        listadoPorHacer=require('../db/data.json');
    }catch(error){
        listadoPorHacer=[];
    }

}


const crear=(descripcion)=>{

    cargarDB();

    let porHacer={
        descripcion,
        completado:false
    };
    
    listadoPorHacer.push(porHacer);
    
    guardarDB();

    return porHacer;
}

const getListado=(completado)=>{
    if(completado===undefined){
        cargarDB();
        return listadoPorHacer;
    }else if(completado==='true'){
        cargarDB();
        let listadoCompletos= listadoPorHacer.filter(tarea=>{
            return tarea.completado===true;
        });
        return listadoCompletos;
    }else if(completado==='false'){
        cargarDB();
        let listadoFaltantes=listadoPorHacer.filter(tarea=>{
            return tarea.completado===false;
        });
        return listadoFaltantes;
    }else{
        console.log("\n====================".red)
        console.log("Filtro no reconocido".red)
        console.log("====================\n".red)
        cargarDB();
        return listadoPorHacer;
    }
}

const actualizar=(desc, completado=true)=>{
    
    cargarDB();
    let index=listadoPorHacer.findIndex( tarea=>{
        return tarea.descripcion===desc;
    })
    if(index>=0){
        listadoPorHacer[index].completado=completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const borrar=(desc)=>{
    cargarDB();
    let nuevoListado= listadoPorHacer.filter(tarea=>{
        return tarea.descripcion!==desc;
    });
    
    if(listadoPorHacer.length===nuevoListado.length){
        return false;
    }else{
        listadoPorHacer=nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports={
    crear,
    getListado,
    actualizar,
    borrar
}