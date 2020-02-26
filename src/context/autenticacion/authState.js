import React,{useReducer} from 'react';

import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../components/config/axios'
import tokenAuth from '../../components/config/tokenAuth'

import {
 REGISTRO_EXITOSO,
 REGISTRO_ERROR,
 OBTENER_USUARIO,
 LOGIN_EXITOSO,
 LOGIN_ERROR,
 CERRAR_SESION
} from '../../types';

const AuthState = (props) => {

    const initialState ={
           token: localStorage.getItem('token'),
           autenticado: null,
           usuario: null,
           mensaje: null,
           cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    //
    const registrarUsuarioFn = async datos =>{

        try {
            const respuesta = await clienteAxios.post('/api/users',datos);
            // console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticadoFn();
        } catch (error) {
            // console.log(error.response.data.message);
              const alerta = {
                  msj: error.response.data.message,
                  categoria: 'alerta-error'
              }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticado
    const usuarioAutenticadoFn = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            //TODO: funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // iniciar sesion
     const iniciarSesionFn = async datos =>{
         try {
             const respuesta = await clienteAxios.post('/api/auth',datos);
            //  console.log(respuesta);
             dispatch({
                 type:LOGIN_EXITOSO,
                 payload: respuesta.data
             });
             usuarioAutenticadoFn();
         } catch (error) {
            //  console.log(error.response.data.message);
            const alerta = {
                msj: error.response.data.message,
                categoria: 'alerta-error'
            }
          dispatch({
              type: LOGIN_ERROR,
              payload: alerta
          })
         }
     }

     //cerrar sesion de usuario
     const cerrarSesionFn = () =>{
         dispatch({
             type: CERRAR_SESION
         })
     }


    return (
        <authContext.Provider
        value={{
           token: state.token,
           autenticado: state.autenticado,
           usuario: state.usuario,
           mensaje: state.mensaje,
           cargando: state.cargando,

           registrarUsuarioFn,
           usuarioAutenticadoFn,
           iniciarSesionFn,
           cerrarSesionFn
        }}
        >
         {props.children}
        </authContext.Provider>
    );
};

export default AuthState;