import { useAuth } from "../../../context/authContext";
import React, { useState } from "react";
import axios from "axios";
import "./FormFireBase.css";
import usuarioImg from "../../../assets/images/user.png";
import keyImg from "../../../assets/images/door-key.png";
import bot2 from "../../../assets/images/bot2.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormFirebase({ setIsLogged, onClose, setCurrentUser }) {
  const auth = useAuth();
  const { displayName } = auth.user;
  // console.log(displayName)
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [email, setEmail] = useState("dgouldthorpe6@fastcompany.com");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const alertaContrasena=()=>{
    toast.error('Contraseña incorrecta!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const alertaUsuario=()=>{
    toast.error('Usuario no encontrado', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  
  const alertaBienvenido=()=>{
    toast.success('Bienvenido de nuevo!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    let response = await axios.get(
      `http://localhost:3000/usuarios?correo=${email}`
    );
    if (response.data[0] && !response.data[0].contrasena) {
      setCurrentUser(response.data[0]);
      setIsLogged(true);
      onClose();
      alertaBienvenido()
    }
    else if(response.data[0] && response.data[0].contrasena){
      if(response.data[0].contrasena===password){
        
        setCurrentUser(response.data[0]);
        setIsLogged(true);
        onClose();
        alertaBienvenido()
      }else{
        alertaContrasena()
      }
    }else{
      alertaUsuario()
    }
    // auth.login(email, password) // habilitar esto después
  };

  const handleGoogle = async (e) => {
    e.preventDefault();

    try {
      // Autenticación con Google
      const user = await authContext.loginWithGoogle();

      // Crear un nuevo usuario para almacenar en Firestore
      const newUser = {
        userId: user.uid,
        nombre: user.displayName || "",
        correo: user.email || "",
        saldo: 0, // Ajusta según tus necesidades
        bolsillos: [],
        historial: [],
      };

      // Almacenar información adicional en Firestore
      const response = await axios.post("http://localhost:3000/usuarios", newUser);

      setCurrentUser(response.data);
      setIsLogged(true);
      onClose();

      // Llama a la función handleLoginSuccess después del inicio de sesión con Google
      handleLoginSuccess(response.data);
    } catch (error) {
      console.error("Error during Google sign-in: ", error);
    }
  };

  const handleSwitchForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="form-container">
      {showLogin ? (
        <div className="login-form">
          <div className="img-div">
            <img src={bot2} alt="bot" />
          </div>
          <form className="form">
            <h3 className="title">Ingresar a mi cuenta</h3>
            <div className="form-group">
              <div className="input-group">
                <span>
                  <img src={usuarioImg} alt="user" />
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  type="email"
                  placeholder="Correo"
                />
              </div>
              <div className="input-group">
                <span>
                  <img src={keyImg} alt="user" />
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  type="password"
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-actions">
                <span className="toSignup-span" onClick={handleSwitchForm}>
                  No tengo cuenta
                </span>
                <button onClick={(e) => handleLogin(e)} className="button">
                  Ingresar
                </button>
              </div>
            </div>
            <button
              onClick={(e) => handleGoogle(e)}
              type="button"
              className="login-with-google-btn"
            >
              Ingresar con Google
            </button>
          </form>
        </div>
      ) : (
        <div className="signup-form">
          <form className="form">
            <h3 className="title">Registrate</h3>
            <input
              onChange={(e) => setEmailRegister(e.target.value)}
              className="input"
              type="email"
            />
            <input
              onChange={(e) => setPasswordRegister(e.target.value)}
              className="input"
              type="password"
            />
            <button onClick={(e) => handleRegister(e)} className="button">
              ENVIAR
            </button>
          </form>
          <span onClick={handleSwitchForm}>Ya tengo cuenta</span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export { FormFirebase };