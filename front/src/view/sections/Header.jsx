import { useState } from "react";
import Logo from "../components/headerComponentes/Logo";
import "./Header.css";
import Modal from "./Modal";
import LogInForm from "../components/headerComponentes/LogInForm";

function Header({ isLogged, setIsLogged, currentUser, setCurrentUser,actualizar,setSesionOpenAI }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const logOut = () => {
    setSesionOpenAI({});
    setCurrentUser({});
    setIsLogged(false);
  };

  return (
    <>
      {isLogged ? (
        <header className="header-logged-div">
          <Logo />
          <div className="welcome-container">
            <img
              src="https://thispersondoesnotexist.com/"
              alt="profile-pic"
              className="profile-pic"
            />
            <div className="welcome__name">
              <h5>Bienvenid@, </h5>
              <h5>{currentUser.nombre}</h5>
            </div>
          </div>
          <div className="log-out">
            <p onClick={logOut}>Cerrar sesión</p>
          </div>
        </header>
      ) : (
        <header className="header-not-logged-div">
          <Logo></Logo>
          <button onClick={openModal}>Ingresar</button>
        </header>
      )}

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <LogInForm
            setIsLogged={setIsLogged}
            onClose={closeModal}
            setCurrentUser={setCurrentUser}
            actualizar={actualizar}
          />
        </Modal>
      )}
    </>
  );
}

export default Header;
