import React,{useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    // context proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

     //context tarea
     const tareasContext = useContext(TareaContext);
     const {eliminarTareaFn, obtenerTareasFn,actualizarTareaFn,guardarTareaActualFn} = tareasContext;

     const [proyectoActualFn]=proyecto;

     const tareaEliminar = id =>{
            eliminarTareaFn(id, proyectoActualFn._id);
            obtenerTareasFn(proyectoActualFn.id);
          
     }

     //modificar ele stadod e la tarea 
     const cambiarEstado = tarea=>{
         if(tarea.status){
            tarea.status = false;
         }else{
            tarea.status = true;
         }
         actualizarTareaFn(tarea);
     }

     const seleccionarTarea = tarea =>{
        guardarTareaActualFn(tarea);
     }

    return (
    <li className="tarea sombra">
        <p>{tarea.name}</p>
        <div className="estado">
            {tarea.status 
            ? 
            (
                <button
                type="button"
                onClick={()=>cambiarEstado(tarea)}
                className="completo">Completo</button>
            )
            :
            (
                <button
                type="button"
                onClick={()=>cambiarEstado(tarea)}
                className="incompleto">Incompleto</button>
            )
            }
        </div>
        <div className="acciones">
            <button
              type="button"
              className="btn btn-primario"
              onClick={()=>seleccionarTarea(tarea)}
            >Editar</button>
            <button
              type="button"
              className="btn btn-secundario"
              onClick={()=>tareaEliminar(tarea._id)}
            >Eliminar</button>
        </div>
    </li>
    );
};

export default Tarea;