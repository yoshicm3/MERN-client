import React,{Fragment,useState, useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    //state del formulario
      const proyectosContext = useContext(proyectoContext);
      const {formulario,errorformulario,mostrarFormulario,agregarProyecto, mostrarErrorFn} = proyectosContext;
      

    const [proyecto,guardarProyecto] = useState({
        name: ''
    });
    

    const onChangeProyecto = e=>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    const {name} = proyecto;


    //envair un proyecto
    const onSubmitProyecto =e=>{
        e.preventDefault();

        //validar el proyecto
        if(name ===''){
            mostrarErrorFn();
           return;
        }

        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar form
        guardarProyecto({
            name:''
        });
    }

    return (
        <Fragment>

        
        <button
        onClick={()=>mostrarFormulario(true)}
        type="button"
        className="btn btn-block btn-primario">
            Nuevo Proyecto
        </button>
        {formulario ?
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
            <input 
            type="text"
            className="input-text" 
            placeholder="Nombre Proyecto"
            onChange={onChangeProyecto}
            value={name}
            name="name" />
            <input type="submit" className="btn btn-primario btn-block" value="Agregar proyecto"/>
        </form>
        :null}

        {errorformulario? <p className="mensaje error">Campo obligatorio</p> : null}

        </Fragment>
    );
};

export default NuevoProyecto;