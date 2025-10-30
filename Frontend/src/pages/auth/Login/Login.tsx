import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import useCustomToast from '../../../components/ui/use-toast';
import voluntarioService from '../../../services/voluntarioService';
import ongService from '../../../services/ongService'; // Importando o serviço da ONG
import Cookies from 'js-cookie';

function Login() {
  const IconeSetaEsquerda = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
  );

  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  const [tipoLogin, setTipoLogin] = useState('VOLUNTARIO');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[]; general?: string }>({});

  const seletorClasse = (tipo: string) => {
    const classes = [styles.seletorBotao];
    if (tipoLogin === tipo) {
      classes.push(styles.ativo);
    }
    return classes.join(' ');
  };

  const handleTypeChange = (type: string) => {
    setTipoLogin(type);
    setEmail('');
    setPassword('');
    setErrors({});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      let response;
      if (tipoLogin === 'VOLUNTARIO') {
        response = await voluntarioService.login({ email, password });
        const { access_token, voluntario, message } = response.data;

        Cookies.set('token', access_token, { expires: 7, path: '/' });
        localStorage.setItem('user', JSON.stringify(voluntario));
        localStorage.setItem('userType', 'voluntario'); // Armazenando o tipo de usuário

        showToast(message || 'Login realizado com sucesso!', 'success');
        navigate('/home/voluntario');
      } else { // Lógica para login de ONG
        response = await ongService.login({ email, password });
        const { access_token, ong, message } = response.data;

        Cookies.set('token', access_token, { expires: 7, path: '/' });
        localStorage.setItem('user', JSON.stringify(ong));
        localStorage.setItem('userType', 'ong'); // Armazenando o tipo de usuário

        showToast(message || 'Login de ONG realizado com sucesso!', 'success');
        navigate('/dashboard/ong'); // Redirecionando para a home da ONG
      }
    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 422) { // Erros de validação
                setErrors(data.errors || {});
                showToast('Por favor, corrija os erros no formulário.', 'error');
            } else if (status === 401) { // Erro de autenticação
                setErrors({ general: data.message || 'Email ou senha inválidos.' });
                showToast(data.message || 'Email ou senha inválidos.', 'error');
            } else { // Outros erros do servidor
                const errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
                setErrors({ general: errorMessage });
                showToast(errorMessage, 'error');
            }
        } else {
            const errorMessage = 'Não foi possível conectar ao servidor.';
            setErrors({ general: errorMessage });
            showToast(errorMessage, 'error');
        }
    }
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
            <button type="button" className={seletorClasse('VOLUNTARIO')} onClick={() => handleTypeChange('VOLUNTARIO')}>
              Voluntário
            </button>
            <button type="button" className={seletorClasse('ONG')} onClick={() => handleTypeChange('ONG')}>
              ONG
            </button>
          </div>

          <div className={styles.grupoInput}>
            <input type="email" placeholder="Endereço de Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className={styles.erro}>{errors.email[0]}</span>}
          </div>
          <div className={styles.grupoInput}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className={styles.erro}>{errors.password[0]}</span>}
          </div>

          {errors.general && <p className={styles.erroGeral}>{errors.general}</p>}

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
