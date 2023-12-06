import React, { useState } from "react";
import "./Registro.css";
import imagenRegistro from "../../../assets/images/robot-registro.png";
import { v4 } from "uuid";
import axios from "axios";

const generarNumeroCuentaAleatorio = () => {
  const longitudCuenta = 10;
  const numerosPermitidos = "0123456789";
  let numeroCuenta = "";

  for (let i = 0; i < longitudCuenta; i++) {
    const indice = Math.floor(Math.random() * numerosPermitidos.length);
    numeroCuenta += numerosPermitidos.charAt(indice);
  }

  return Number(numeroCuenta);
};

const Registro = () => {
  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [saldo, setSaldo] = useState("");

  async function crearUsuario() {
    let idNuevo = v4();
    let cuentaNueva = {
      id: idNuevo,
      numeroCuenta: generarNumeroCuentaAleatorio(),
      bolsillos: [
        {
          id: 0,
          nombre: "Libre",
          meta: 0,
          imagen: "",
          deposito: Number(saldo),
        },
      ],
      gastos: [],
      idUsuario: idNuevo,
    };

    let responseCuenta = await axios.post(
      "http://localhost:3000/cuentas",
      cuentaNueva
    );
    let usuarioNuevo = {
      id: idNuevo,
      nombre: nombre + " " + apellido,
      correo,
      contrasena,
      idCuenta: responseCuenta.data.id,
    };
    await axios.post("http://localhost:3000/usuarios", usuarioNuevo);
  }

  const agregarUsuario = () => {
    if (nombre && apellido && correo && contrasena && saldo) {
      var respuesta = window.confirm("desea agregar el usuario");
      if (respuesta) {
        crearUsuario();
        alert("usuario creado");
      }
    } else {
      alert("Llena todos los campos");
    }
  };

  // Manejar el envío del formulario
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const nuevoNumeroCuenta = generarNumeroCuentaAleatorio();

  //   try {
  //     // Registrar usuario con Firebase Authentication
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       correo,
  //       contrasena
  //     );

  //     // Obtener el ID del usuario recién registrado
  //     const userId = userCredential.user.uid;

  //     // Crear un nuevo usuario para almacenar en Firestore
  //     const newUser = {
  //       userId,
  //       nombre,
  //       apellido,
  //       correo,
  //       saldo,
  //       numeroCuenta: nuevoNumeroCuenta,
  //       bolsillos: [],
  //       historial: [],
  //     };

  //     // Almacenar información adicional en Firestore
  //     const docRef = await addDoc(collection(db, "users"), newUser);

  //     console.log("Document written with ID: ", docRef.id);

  //     // Limpia los campos después del envío
  //     setNombre("");
  //     setApellido("");
  //     setCorreo("");
  //     setContrasena("");
  //     setSaldo(0);
  //   } catch (error) {
  //     console.error("Error during registration: ", error);
  //   }
  // };

  // // Manejar el inicio de sesión con Google
  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const user = userCredential.user;

  //     // Crear un nuevo usuario para almacenar en Firestore
  //     const newUser = {
  //       userId: user.uid,
  //       nombre: user.displayName || "", // Puedes acceder al nombre si está disponible
  //       correo: user.email || "", // Puedes acceder al correo electrónico si está disponible
  //       saldo,
  //       bolsillos: [],
  //       historial: [],
  //     };

  //     // Almacenar información adicional en Firestore
  //     const docRef = await addDoc(collection(db, "users"), newUser);

  //     console.log("Document written with ID: ", docRef.id);

  //     // Puedes realizar acciones adicionales después del inicio de sesión con Google si es necesario
  //     console.log("Google sign-in successful:", user);
  //   } catch (error) {
  //     console.error("Error during Google sign-in: ", error);
  //   }
  // };

  return (
    <section className="contenedor-registro">
      <form className="contenedor-form">
        <h3>Registrarme</h3>
        <input
          type="text"
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombres"
        />
        <input
          type="text"
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellidos"
        />
        <input
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
        />
        <input
          type="number"
          onChange={(e) => setSaldo(e.target.value)}
          placeholder="Saldo Inicial"
        />
        <div className="botones">
          <button
            type="button"
            className="boton-registrarse"
            onClick={agregarUsuario}
          >
            Registrarse
          </button>
          <button type="submit" className="boton-google">
            Registrarse con Google
          </button>
        </div>
      </form>

      <div className="contenedor-img">
        <img src={imagenRegistro} alt="robot-con-celular" />
      </div>
    </section>
  );
};

export default Registro;
