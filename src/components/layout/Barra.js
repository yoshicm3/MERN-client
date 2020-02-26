import React,{useContext,useEffect} from 'react';

import authContext from '../../context/autenticacion/authContext';

const Barra = () => {

    //extraer la informacion de autenticacion
    const AuthContext = useContext(authContext);
    const {usuario,usuarioAutenticadoFn,cerrarSesionFn} = AuthContext;

    useEffect(() => {
        usuarioAutenticadoFn();
        // eslint-disable-next-line
    }, []);

    

    return (
        <header className="app-header">
            <p className="nombre-usuario">
             Hola {usuario ? <span>{usuario.name}</span> : <span></span>}
            </p>

            <nav className="nav-principal">
              <button 
              className="btn btn-blank cerrar-sesion"
              onClick={()=>cerrarSesionFn()}>
                     Cerrar Sesión
              </button>
            </nav>
        </header>
    );
};

export default Barra;