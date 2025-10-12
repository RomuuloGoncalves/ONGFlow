import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.css';

import ONGFlowImagem from '../../assets/ONGFlow.jpeg';

function Home() {
  return (
    <div className={styles.containerPagina}>
      <header className={styles.cabecalho}>
        <h1 className={styles.logo}>ONGFLOW</h1>
        <nav className={styles.navegacao}>
          <Link to="/login" className={styles.botaoSecundario}>Entrar</Link>
          <Link to="/signUp" className={styles.botaoPrimario}>Cadastrar-se</Link>
        </nav>
      </header>

      <main className={styles.conteudoPrincipal}>
        <div className={styles.blocoTexto}>
          <h2 className={styles.titulo}>
            Onde a vontade de ajudar encontra a oportunidade.
          </h2>
          <p className={styles.subtitulo}>
            Nós somos a ponte entre voluntários dedicados e ONGs que fazem a diferença.
            Encontre sua causa, doe seu tempo e faça parte da mudança.
          </p>
          <div>
            <Link to="/signUp" className={`${styles.botaoPrimario} ${styles.botaoChamadaAcao}`}>Quero Fazer Parte</Link>
          </div>
        </div>
        <div className={styles.containerImagem}>
          <img src={ONGFlowImagem} alt="Voluntários e ONGs se conectando" className={styles.imagemApresentacao} />
        </div>
      </main>
    </div>
  );
}

export default Home;

