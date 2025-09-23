import Reac, { useState } from "react";
import style from "./formVol.module.css";
import { FaUser, FaPhone, FaHashtag, FaCalendarAlt } from 'react-icons/fa'; 

function FormVol() {
    const [userType, setUserType] = useState('voluntario');

  return (
      <div className={style.formWrapper}>
        <div className={style.header}>
          <span className={style.backArrow}>&lt;</span>
          <h2>Cadastro Voluntário</h2>
          <span className={style.progress}>2/2</span>
        </div>
        <div className={style.switchContainer}>
          <button
            className={`${style.switchButton} ${
              userType === "voluntario" ? style.active : ""
            }`}
            onClick={() => setUserType("voluntario")}
          >
            Voluntário
          </button>
          <button
            className={`${style.switchButton} ${
              userType === "ong" ? style.active : ""
            }`}
            onClick={() => setUserType("ong")}
          >
            ONG
          </button>
        </div>
        <div className={style.inputGroup}>
          <FaUser className={style.icon} />
          <input type="text" placeholder="Nome Completo" />
        </div>
        <div className={style.inputGroup}>
          <FaPhone className={style.icon} />
          <input type="tel" placeholder="Telefone" />
        </div>
        <div className={style.inputGroup}>
          <FaHashtag className={style.icon} />
          <input type="text" placeholder="Seu CPF" />
        </div>
        <div className={style.inputGroup}>
          <FaCalendarAlt className={style.icon} />
          <input
            type="text"
            placeholder="Data de Nascimento"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <button className={`${style.submitButton} ${style.fullWidth}`}>
          Cadastrar-se
        </button>
      </div>
  );
}

export default FormVol;
