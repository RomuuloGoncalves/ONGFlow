import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const IconeSetaEsquerda = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
  );

  const [tipoLogin, setTipoLogin] = useState('VOLUNTARIO');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const seletorClasse = (tipo: string) => {
    const classes = [styles.seletorBotao];
    if (tipoLogin === tipo) {
      classes.push(styles.ativo);
    }
    return classes.join(' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do login:", { email, senha });
  };

  return (
    <div className={styles.container}>
      <div className={styles.painelEsquerdo}>
        <h1 className={styles.logo}>ONGFLOW</h1>
      </div>

      <div className={styles.painelDireito}>
        <form className={styles.containerFormulario} onSubmit={handleSubmit}>
          <div className={styles.cabecalhoFormulario}>
            <div className={styles.titulo}>
              <Link to="/">
                <button type="button" className={styles.botaoVoltar}><IconeSetaEsquerda /></button>
              </Link>
              <h1>Login</h1>
            </div>
          </div>

          <div className={styles.seletorTipo}>
            <button type="button" className={seletorClasse('VOLUNTARIO')} onClick={() => setTipoLogin('VOLUNTARIO')}>
              Voluntário
            </button>
            <button type="button" className={seletorClasse('ONG')} onClick={() => setTipoLogin('ONG')}>
              ONG
            </button>
          </div>

          <div className={styles.grupoInput}>
            <input type="email" placeholder="Endereço de Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.grupoInput}>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          <p className={styles.linkLogin}>
            Não tem conta? <Link to="/signup">Cadastre-se</Link>
          </p>

          <div className={styles.containerBotaoSubmit}>
            <button type="submit" className={styles.botaoSubmit}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;