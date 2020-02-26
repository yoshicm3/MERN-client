import React,{useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //context proyectos
 const proyectosContext = useContext(proyectoContext);
 const {proyectoActualFn} = proyectosContext;

    //context tarea
 const tareasContext = useContext(TareaContext);
 const {obtenerTareasFn} = tareasContext;

 //funcion para agregar el proyecto actual
 const seleccionarProyecto = id =>{
    proyectoActualFn(id); //fijar un proyecto actual
    obtenerTareasFn(id); 
 }

    return (
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={()=>seleccionarProyecto(proyecto._id)}
            >
             {proyecto.name}
            </button>
        </li>
    );
};

export default Proyecto;