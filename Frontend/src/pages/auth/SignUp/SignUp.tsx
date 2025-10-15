import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormVoluntario from '../../../components/SignUp/FormVoluntario/FormVoluntario';
import FormOng from '../../../components/SignUp/FormOng/FormOng';
import styles from './SignUp.module.css';

import serverService from '../../../services/serverService';

function SignUp() {
  const IconeSetaEsquerda = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
  );

  const [tipoCadastro, setTipoCadastro] = useState('VOLUNTARIO');
  const [dadosFormulario, setDadosFormulario] = useState({});
  const [errors, setErrors] = useState({});

  const manipularSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();

    // objeto que será enviado
    const payload = { ...dadosFormulario, status: 'ativo' };

    try {
      if (tipoCadastro === 'VOLUNTARIO') {
        const response = await serverService.post('/voluntarios', payload);
        console.log("Resposta do cadastro de voluntário:", response.data);

        alert('Voluntário cadastrado com sucesso!');

      } else if (tipoCadastro === 'ONG') {
        const response = await serverService.post('/ongs', payload);
        console.log("Resposta do cadastro de ONG:", response.data);

        alert('ONG cadastrada com sucesso!');
      }
    } catch (error: any) {
      // Para tratar problemas com os dados
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else { // Para tratar problemas com o servidor
        alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  const atualizarDadosFormulario = (novosDados: any) => {
    setDadosFormulario(novosDados);
  };

  const seletorClasse = (tipo: string) => {
    const classes = [styles.seletorBotao];
    if (tipoCadastro === tipo) {
      classes.push(styles.ativo);
    }
    return classes.join(' ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.painelEsquerdo}>
        <h1 className={styles.logo}>ONGFLOW</h1>
      </div>
      <div className={styles.painelDireito}>
        <form className={styles.containerFormulario} onSubmit={manipularSubmit}>
          <div className={styles.cabecalhoFormulario}>
            <div className={styles.titulo}>
              <Link to="/">
                <button type="button" className={styles.botaoVoltar}><IconeSetaEsquerda /></button>
              </Link>
              <h1>Cadastro</h1>
            </div>
          </div>
          <div className={styles.seletorTipo}>
            <button type="button" className={seletorClasse('VOLUNTARIO')} onClick={() => {setTipoCadastro('VOLUNTARIO'); setErrors({});}}>Voluntário</button>
            <button type="button" className={seletorClasse('ONG')} onClick={() => {setTipoCadastro('ONG'); setErrors({});}}>ONG</button>
          </div>

          {tipoCadastro === 'VOLUNTARIO'
            ? <FormVoluntario aoAlterar={atualizarDadosFormulario} styles={styles} errors={errors} /> // MODIFICADO
            : <FormOng aoAlterar={atualizarDadosFormulario} styles={styles} />
          }

          <p className={styles.linkLogin}>Já tem conta? <Link to="/login">Faça Login</Link></p>

          <div className={styles.containerBotaoSubmit}>
            <button type="submit" className={styles.botaoSubmit}>
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
