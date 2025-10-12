import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import voluntarioService from '../../services/voluntarioService';

import FormVoluntario from '../../components/SignUp/FormVoluntario/FormVoluntario';
import FormOng from '../../components/SignUp/FormOng/FormOng';

import { useToast } from '../../context/ToastContext';

import styles from './SignUp.module.css';

const IconeSetaEsquerda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

function SignUp() {
  const [tipoCadastro, setTipoCadastro] = useState('VOLUNTARIO');
  const [dadosFormulario, setDadosFormulario] = useState({});

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { showToast } = useToast();

  const manipularSubmit = async (evento) => {
    evento.preventDefault();

    // Limpa erros anteriores
    setValidationErrors({});
    setLoading(true);

    const dadosFinais = {
      tipo: tipoCadastro,
      ...dadosFormulario,
      status: 'ativo',
    };

    try {
      await voluntarioService.cadastro(dadosFinais);
      showToast('Cadastro realizado com sucesso!', 'success');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setValidationErrors(err.response.data.errors || {});
        showToast("Corrija os erros e tente novamente!", 'error');
      } else {
        console.error("Erro no cadastro:", err);
        showToast("Não foi possível realizar o cadastro. Tente novamente mais tarde.", 'error');

      }
    } finally {
      setLoading(false);
    }
  };

  const atualizarDadosFormulario = (novosDados) => {
    setDadosFormulario(novosDados);
  };

  const seletorClasse = (tipo) => {
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
            <button type="button" className={seletorClasse('VOLUNTARIO')} onClick={() => setTipoCadastro('VOLUNTARIO')}>Voluntário</button>
            <button type="button" className={seletorClasse('ONG')} onClick={() => setTipoCadastro('ONG')}>ONG</button>
          </div>

          {tipoCadastro === 'VOLUNTARIO'
            ? <FormVoluntario aoAlterar={atualizarDadosFormulario} styles={styles} errors={validationErrors} />
            : <FormOng aoAlterar={atualizarDadosFormulario} styles={styles} errors={validationErrors} />
          }

          <p className={styles.linkLogin}>Já tem conta? <a href="/login">Faça Login</a></p>

          <div className={styles.containerBotaoSubmit}>
            <button type="submit" className={styles.botaoSubmit} disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar-se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;