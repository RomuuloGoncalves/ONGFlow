import Reac, { useState } from "react";
import { FaUser, FaPhone, FaHashtag, FaCalendarAlt } from 'react-icons/fa'; 
import style from './formONG.module.css'

function FormONG() {
   const [userType, setUserType] = useState('ong');
  return (
      <div className={style.formWrapper}>
        <div className={style.header}>
          <span className={style.backArrow}>&lt;</span>
          <h2>Cadastro ONG</h2>
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
          <input type="text" placeholder="Nome ONG" />
        </div>
        <div className={style.inputGroup}>
          <FaPhone className={style.icon} />
          <input type="text" placeholder="Endereço (Ex: Rua das Flores, 123 - Centro, São Paulo - 01001-000)
" />
        </div>
        <div className={style.inputGroup}>
          <FaHashtag className={style.icon} />
          <input type="text" placeholder="CNPJ (Ex: 00.000.000/0000-00)" />
        </div>
        <div className={style.inputGroup}>
          <FaCalendarAlt className={style.icon} />
          <input
            type="text"
            placeholder="Data Fundação"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <button className={`${style.submitButton} ${style.fullWidth}`}>
          Cadastrar-se
        </button>
      </div>
  )
}

export default FormONG