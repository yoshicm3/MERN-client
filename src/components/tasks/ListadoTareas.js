import React,{Fragment, useContext} from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyectoFn} = proyectosContext;

        //context tarea
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext;

    //si no hay tareas no mostrar este componente
    if(!tareasproyecto) return null;

    //condicion para mostrar el nombre del proyecto seleccionado
    const nombreProyecto = (proyecto === null) ? '' : proyecto[0].name; 

    return (
        <Fragment>
        <h2>Proyecto: {nombreProyecto}</h2>
        <ul className="listado-tareas">
              {tareasproyecto.length === 0 
              ? (<li className="tarea"> <p>no hay tareas</p></li>)
              :
              <TransitionGroup>
                {
                    tareasproyecto.map((tarea,i)=>(
                        <CSSTransition 
                        key={i}
                        timeout={200}
                        classNames="tarea"
                        >
                            <Tarea  tarea={tarea} />
                        </CSSTransition>
                    ))
                }
              </TransitionGroup>
            }
        </ul>
        <button
        type="button"
        className="btn btn-eliminar"
        onClick={()=>eliminarProyectoFn( proyecto[0]._id)}
        >Eliminar Proyecto &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;