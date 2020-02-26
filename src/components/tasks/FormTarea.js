import React,{useContext,useState,useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    

    const [tarea, guardarTarea]= useState({name:''});

    const {name} = tarea;
    
    // context proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //context tarea
    const tareasContext = useContext(TareaContext);
    const {errortarea,
        tareaseleccionada,
        agregarTareaFn,
        validarTareaFn,
        obtenerTareasFn,
        actualizarTareaFn,
        limpiarTareaFn} = tareasContext;

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({name:''});
        }
    }, [tareaseleccionada]);


    if(!proyecto) return null;

    const [proyectoActualFn]=proyecto;

    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validar
        if(name.trim() === ''){
            validarTareaFn();
            return;
        }

        //revisar si es edicion o nueva tarea
        if(tareaseleccionada === null){
            //agregar la nueva tarea al state
            tarea.project = proyectoActualFn._id;
            tarea.estado = false;
            agregarTareaFn(tarea);
        }else{
            //actualizar tarea existente
            actualizarTareaFn(tarea);
            //eliminar tarea seleccionada
            limpiarTareaFn();
        }

        

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareasFn(proyectoActualFn._id);

        //reiniciar el formulario
        guardarTarea({
            name: ''
        })
    }

    return (
        <div className="formulario">
            <form
            onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre Tarea..."
                    name="name"
                    value={name}
                    onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionada ? 'Editar Tarea' : "Agregar Tarea"}/>
                </div>
            </form>
            {errortarea 
            ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> 
            : null}
        </div>
    );
};

export default FormTarea;