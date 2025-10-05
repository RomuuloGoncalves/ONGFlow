import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import FormVoluntario from '../../components/SignUp/FormVoluntario/FormVoluntario';
import FormOng from '../../components/SignUp/FormOng/FormOng';

import './SignUp.css';

const IconeSetaEsquerda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

function SignUp() {
  const [tipoCadastro, setTipoCadastro] = useState('VOLUNTARIO');
  const [dadosFormulario, setDadosFormulario] = useState({});

  const manipularSubmit = (evento) => {
    evento.preventDefault();
    const dadosFinais = {
      tipo: tipoCadastro,
      ...dadosFormulario,
    };

    console.log(dadosFinais);
  };

  const atualizarDadosFormulario = (novosDados) => {
    setDadosFormulario(novosDados);
  };

  return (
    <div className="container">
      <div className="painel-esquerdo">
        <h1 className="logo">ONGFLOW</h1>
      </div>
      <div className="painel-direito">
        <form className="container-formulario" onSubmit={manipularSubmit}>
          <div className="cabecalho-formulario">
            <div className="titulo">
              <Link to="/">
                <button type="button" className="botao-voltar"><IconeSetaEsquerda /></button>
              </Link>
              <h1>Cadastro</h1>
            </div>
            {/* <div className="progresso"><p>2/2</p></div> */}
          </div>
          <div className="seletor-tipo">
            <button type="button" className={tipoCadastro === 'VOLUNTARIO' ? 'ativo' : ''} onClick={() => setTipoCadastro('VOLUNTARIO')}>Voluntário</button>
            <button type="button" className={tipoCadastro === 'ONG' ? 'ativo' : ''} onClick={() => setTipoCadastro('ONG')}>ONG</button>
          </div>

          {tipoCadastro === 'VOLUNTARIO'
            ? <FormVoluntario aoAlterar={atualizarDadosFormulario} />
            : <FormOng aoAlterar={atualizarDadosFormulario} />
          }

          <p className="link-login">Já tem conta? <a href="#">Faça Login</a></p>
          <div className="container-botao-submit">
            <button type="submit" className="botao-submit">Cadastrar-se</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;