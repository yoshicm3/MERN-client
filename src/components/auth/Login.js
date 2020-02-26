import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';

import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //context alerta
    const alertasContext = useContext(alertaContext);
    const {alerta,mostrarAlertaFn} = alertasContext;

    const AuthContext = useContext(authContext);
    const {mensaje, autenticado,iniciarSesionFn} = AuthContext;

    //en caso de que password o el usuario no exista
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlertaFn(mensaje.msj,mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje,autenticado,props.history]);

    //state para inicar sesion
    const  [usuario,guardarUsuario] = useState({
         email: '',
         password: ''
    });

    //extraer usuario
    const {email,password} = usuario;

    const onChange = e =>{
       guardarUsuario({
           ...usuario,
           [e.target.name]:e.target.value
       })
    }

    // iniciar sesion
    const onSubmit = e =>{
        e.preventDefault();
        //validar campos vacios
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlertaFn('Todos los campos son obligatorios','alerta-error');

        }

        //call to action
        iniciarSesionFn({email,password});
    }

    return (
         <div className="form-usuario">
             <div className="contenedor-form sombra-dark">
             {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                 <h1>Iniciar Sesión</h1>
                 <form  onSubmit={onSubmit}>
                     <div className="campo-form">
                         <label htmlFor="email">Email</label>
                         <input 
                         type="email"
                         id="email"
                         name="email"
                         placeholder="coloca aquí tú email"
                         value={email}
                         onChange={onChange}/>
                     </div>
                     <div className="campo-form">
                         <label htmlFor="password">Email</label>
                         <input 
                         type="password"
                         id="password"
                         name="password"
                         placeholder="Password"
                         value={password}
                         onChange={onChange}/>
                     </div>
                     <div className="compo-form">
                         <input type="submit" value="Iniciar Sesión" className="btn btn-primario btn-block"/>
                     </div>
                 </form>
                 <Link to="/nueva-cuenta" className="enlace-cuenta">Crear cuenta</Link>
             </div>
         </div>
    );
};

export default Login;