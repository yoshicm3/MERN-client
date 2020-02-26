import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';


import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //context alerta
    const alertasContext = useContext(alertaContext);
    const {alerta,mostrarAlertaFn} = alertasContext;

    const AuthContext = useContext(authContext);
    const {mensaje, autenticado,registrarUsuarioFn} = AuthContext;

    //en caso de que el usuario se haya autnticado o registrado o sea un registro duplicado
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
        name:'',
        email: '',
        password: '',
        confirmar:''
   });

   //extraer usuario
   const {name,email,password, confirmar} = usuario;

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
       if(name.trim() === '' ||
          email.trim() === '' ||
          password.trim() === '' ||
          confirmar.trim() === ''){


        mostrarAlertaFn('todos los campos son obligatorios','alerta-error');
         return;
       }

       //password minimo 6 caracteres
       if(password.length < 6){
        mostrarAlertaFn('el password debe ser almenos de 6 caracteres','alerta-error');
        return;
       }
       //los 2 password iguales
       if(password !== confirmar){
        mostrarAlertaFn('los paswords no son iguales','alerta-error');
        return;
       }

       //pasarlo al action
       registrarUsuarioFn({
           name,email,password
       });
   }

   
    return (
        <div className="form-usuario">
             <div className="contenedor-form sombra-dark">
             {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                 <h1>Obtener una cuenta</h1>
                 <form  onSubmit={onSubmit}>
                 <div className="campo-form">
                         <label htmlFor="nombre">Nombre</label>
                         <input 
                         type="text"
                         id="name"
                         name="name"
                         placeholder="Nombre"
                         value={name}
                         onChange={onChange}/>
                     </div>
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
                         <label htmlFor="password">Password</label>
                         <input 
                         type="password"
                         id="password"
                         name="password"
                         placeholder="Password"
                         value={password}
                         onChange={onChange}/>
                     </div>
                     <div className="campo-form">
                         <label htmlFor="confirmar">Confirmar Password</label>
                         <input 
                         type="password"
                         id="confirmar"
                         name="confirmar"
                         placeholder="confirma tu password"
                         value={confirmar}
                         onChange={onChange}/>
                     </div>
                     <div className="compo-form">
                         <input type="submit" value="Registrar" className="btn btn-primario btn-block"/>
                     </div>
                 </form>
                 <Link to="/" className="enlace-cuenta">Volver al Login</Link>
             </div>
         </div>
    );
};

export default NuevaCuenta;