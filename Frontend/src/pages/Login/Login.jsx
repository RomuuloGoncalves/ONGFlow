import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [tipoLogin, setTipoLogin] = useState('VOLUNTARIO');

  const seletorClasse = (tipo) => {
    return `${styles.seletorBotao}${tipoLogin === tipo ? ` ${styles.ativo}` : ''}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.ladoEsquerdo}>
        <h1 className={styles.logo}>ONGFLOW</h1>
      </div>
      <div className={styles.ladoDireito}>
        <div className={styles.boxLogin}>
          <h2 className={styles.titulo}>Bem-vindo</h2>
          <p className={styles.subtitulo}>Que bom ter você de volta!</p>

          {/* Botão switch adicionado aqui */}
          <div className={styles.seletorTipo}>
            <button
              type="button"
              className={seletorClasse('VOLUNTARIO')}
              onClick={() => setTipoLogin('VOLUNTARIO')}
            >
              Voluntário
            </button>
            <button
              type="button"
              className={seletorClasse('ONG')}
              onClick={() => setTipoLogin('ONG')}
            >
              ONG
            </button>
          </div>

          {/* Formulário condicional baseado no tipo selecionado */}
          {tipoLogin === 'VOLUNTARIO' ? (
            <form className={styles.formulario}>
              <input
                type="email"
                placeholder="Endereço de Email"
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Senha"
                className={styles.input}
              />
              <button type="submit" className={styles.botao}>
                Entrar
              </button>
            </form>
          ) : (
            <form className={styles.formulario}>
              <input
                type="email"
                placeholder="Endereço de Email"
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Senha"
                className={styles.input}
              />
              <button type="submit" className={styles.botao}>
                Entrar
              </button>
            </form>
          )}
          <p className={styles.textoCadastro}>
            Não tem conta? <Link to="/signUp" className={styles.link}>Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;