import React,{useReducer} from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import clienteAxios from '../../components/config/axios';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types';

const TareaState = props =>{

    const initialState = {
         
         tareasproyecto: [],
         errortarea: false,
         tareaseleccionada: null
    }

    //crear dispatch y state -- desde reducer
    const [state, dispatch] = useReducer(TareaReducer,initialState);

    //CREAR FUNCIONES

    //obtener treas de un proyecto
    const obtenerTareasFn = async proyecto =>{
        try {
            const resultado = await clienteAxios.get('/api/tasks',{params: {project:proyecto}});
            // console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    //agregar una tarea al proyecto seleccionado
    const agregarTareaFn = async tarea =>{
        try {
             await clienteAxios.post('/api/tasks',tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //valida y muestra un error en casod e ser necesario
    const validarTareaFn = ()=>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea 
    const eliminarTareaFn = async (id, projectId) =>{
        // console.log(id);
        // console.log(projectId);
        try {
            await clienteAxios.delete(`/api/tasks/${id}`,{params: {project: projectId}});
            dispatch({
                type:ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

   

    //Extrae una tarea para edicion
    const guardarTareaActualFn = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //edita | modifica una tarea
    const actualizarTareaFn = async tarea =>{
        // console.log(tarea);
        try {
            await clienteAxios.put(`/api/tasks/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    //eliminar la tarea seleccionada
     const limpiarTareaFn = ()=>{
         dispatch({
             type: LIMPIAR_TAREA
         })
     }    

    return (
            <TareaContext.Provider
            value={{
               tareasproyecto: state.tareasproyecto,
               errortarea: state.errortarea,
               tareaseleccionada: state.tareaseleccionada,

               obtenerTareasFn,
               agregarTareaFn,
               validarTareaFn,
               eliminarTareaFn,
               guardarTareaActualFn,
               actualizarTareaFn,
               limpiarTareaFn
            }}>
                {props.children}
            </TareaContext.Provider>
    );

}

export default TareaState;