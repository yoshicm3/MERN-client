import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import clienteAxios from '../../components/config/axios';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';


const ProyectoState = props =>{

    

    const initialState ={
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }


    //dispatch para ejecutar las acciones
    const [state,dispatch]= useReducer(proyectoReducer,initialState);


    //serie de funciones para elCRUD
      const mostrarFormulario = ()=>{
          dispatch({
              type:FORMULARIO_PROYECTO
          })
      }

    //obtener los proyectos
    const obtenerProyectos = async () =>{
        try {
            const resultado = await  clienteAxios.get('/api/projects');
            dispatch({
                type:OBTENER_PROYECTOS,
                payload: resultado.data
            })
          } catch (error) {
                const alerta = {
                    msg: error.response.data.message,
                    caregoria: 'alerta-error' 
                }
                dispatch({
                    type: PROYECTO_ERROR,
                    payload: alerta
                });
        
          }
    }

    //agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
        
        try {
           const resultado = await clienteAxios.post('/api/projects',proyecto);
        //    console.log(resultado);
           dispatch({
               type: AGREGAR_PROYECTO,
               payload: resultado.data
           })
        } catch (error) {
            console.log(error.response);
        }
    }

    const mostrarErrorFn = ()=>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //seleccionar el proyecto al que el usuario dio click
    const proyectoActualFn = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //ELIMINA EL RPOYECTO ACTUAL
    const eliminarProyectoFn = async  proyectoId =>{
        try {
             await clienteAxios.delete(`/api/projects/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {

            const alerta = {
                msg: error.response.data.message,
                caregoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    


    return (
        <proyectoContext.Provider
         value={{
             proyectos: state.proyectos,
             formulario: state.formulario,
             errorformulario: state.errorformulario,
             proyecto: state.proyecto,
             mensaje: state.mensaje,

             mostrarFormulario,
             obtenerProyectos,
             agregarProyecto,
             mostrarErrorFn,
             proyectoActualFn,
             eliminarProyectoFn
         }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;