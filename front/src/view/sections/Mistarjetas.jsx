import React, { useEffect, useState } from "react";
import chip from "./../../assets/images/chip.png";
import visa from "./../../assets/images/visa.png";
import "./Mistarjetas.css";
import axios from "axios";

const Mistarjetas = ({ currentUser, actualizar }) => {
  const [tarjetas, setTarjetas] = useState([]);
  useEffect(() => {
    const traerTarjetas = async () => {
      let response = await axios.get(`
      http://localhost:3000/tarjeta?idUsuario=${currentUser.id}
    `);
      setTarjetas(response.data);
    };
    traerTarjetas();
  }, [actualizar]);

  return (
    tarjetas?.length && (
      <div className="MisTarjetas-Container">
        <h2>Mis tarjetas</h2>
        <div className="mistarjetas">
          {tarjetas?.map((tarjeta) => {
            return (
              <article className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="contenedor-front">
                      <h2>BLACK MESA PREMIUM CARD</h2>
                      <img src={chip} alt="chip" className="chip" />
                      <p className="numero-cuenta">
                        {tarjeta.numeroTarjeta
                          .toString()
                          .replace(/\B(?=(\d{4})+(?!\d))/g, " ")}
                      </p>
                      <div className="contenedor-fecha-nombre">
                        <div className="fecha-nombre">
                          <p>
                            <span>{tarjeta.fechaVencimiento}</span>
                          </p>
                          <h2 id="nombre-usuario">{tarjeta.nombreUsuario}</h2>
                        </div>
                        <img src={visa} alt="visa" className="visa" />
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="contenedor-back">
                      <article className="contenedor-codigo-parrafo">
                        <div className="contenedor-cvv">
                          <div className="espacio-codigo">numb</div>
                          <div className="cvv">
                            <p>{tarjeta.cvv}</p>
                          </div>
                        </div>
                        <p>Cupo disponible: {tarjeta.cupoTarjeta}</p>
                      </article>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Mistarjetas;
