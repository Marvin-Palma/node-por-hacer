


const fs=require('fs');

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

const getListado=()=>{
    cargarDB();
    return listadoPorHacer;
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