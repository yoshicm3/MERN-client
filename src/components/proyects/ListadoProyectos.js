import React,{useContext,useEffect} from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Proyecto from './Proyecto';

import alertaContext from '../../context/alertas/alertaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {mensaje,proyectos,obtenerProyectos} = proyectosContext;

    //context alertas
    const AlertaContext = useContext(alertaContext);
    const {alerta,mostrarAlertaFn} = AlertaContext;

    
    useEffect(() => {

        //si hay un error
        if(mensaje){
            mostrarAlertaFn(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    //ver si proyetcos tiene informacion
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

   

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
           <TransitionGroup>
           {proyectos.map(proyecto=>(
               <CSSTransition
               key={proyecto._id}
               timeout={200}
               classNames="proyecto">
                   <Proyecto proyecto={proyecto} />
               </CSSTransition>
           ))}
           </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;