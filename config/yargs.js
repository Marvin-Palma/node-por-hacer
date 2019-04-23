
const argv =require('yargs')
.command('crear', 'Crea un elemento para la lista de cosas por hacer', 
{  
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de tarea por hacer'
    }
})
.command('actualizar', 'Actualiza el listado de cosas por hacer',
{
    descripcion: {
        demand:true,
        alias: 'd',
        desc: 'Descripción de tarea por actualizar'
    },
    completado:{
        default: true,
        alias: 'c',
        desc: 'Marca como completado o pendiente una tarea'
    }
})
.command('borrar', 'Borra un elemento de la lista de cosas por hacer',
{
    descripcion:{
        demand: true,
        alias: 'd',
        desc: 'Elimina un elemento de la lista'
    }
})
.command('listar', 'Lista los elementos',
{
    completado:{
        alias: 'c',
        desc: 'Lista los elementos completados o no completados'
    }
})
.help()
.argv;

module.exports={
    argv
}