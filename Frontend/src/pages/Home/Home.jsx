import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import ONGFlowImagem from '../../assets/ONGFlow.jpeg';

function Home() {
  return (
    <div className="container-pagina-inicial">
      <header className="cabecalho-pagina-inicial">
        <h1 className="logo">ONGFLOW</h1>
        <nav className="navegacao-cabecalho">
          <Link to="/login" className="botao-secundario">Entrar</Link>
          <Link to="/signUp" className="botao-primario">Cadastrar-se</Link>
        </nav>
      </header>

      <main className="conteudo-principal">
        <div className="bloco-de-texto">
          <h2 className="titulo-principal">
            Onde a vontade de ajudar encontra a oportunidade.
          </h2>
          <p className="subtitulo-principal">
            Nós somos a ponte entre voluntários dedicados e ONGs que fazem a diferença.
            Encontre sua causa, doe seu tempo e faça parte da mudança.
          </p>
          <div className="container-botao-chamada">
            <Link to="/signUp" className="botao-primario botao-chamada-acao">Quero Fazer Parte</Link>
          </div>
        </div>
        <div className="container-imagem">
          <img src={ONGFlowImagem} alt="Voluntários e ONGs se conectando" className="imagem-apresentacao" />
        </div>
      </main>
    </div>
  );
}

export default Home;