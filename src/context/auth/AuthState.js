import React from "react"
import { useEffect } from "react"
import AuthContext from "./authContext"

const AuthState = (props) => {

    const [logeado, setLogeado] = React.useState(false);

    const iniciarSesionState = (objSesion) => {
        localStorage.setItem("sesion", JSON.stringify(objSesion));
        setLogeado(true);
    }

    const cerrarSesion = () => {
        localStorage.removeItem("sesion");
        setLogeado(false);
        window.location.pathname = "/";
    }

    const getUserLogued = () => {
        if (localStorage.getItem("sesion")){
            let user = JSON.parse(localStorage.getItem("sesion"));
            return user;
        }
    }

    const iniciarSesionConLocalStorage = () => {
        const stringSesion = localStorage.getItem("sesion");
        if (stringSesion) {
            const objSesion = JSON.parse(stringSesion);
            setLogeado(true);
        } else {
            console.log("NO HABIA UNA SESIÓN ACTIVA");
        }
    }
    useEffect(() => {
        iniciarSesionConLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={{
            logeado: logeado,
            iniciarSesionState,
            cerrarSesion,
            getUserLogued
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
