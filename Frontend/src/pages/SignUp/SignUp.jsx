import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SignUp.module.css';
import FormVol from '../../components/formVol/';
import FormONG from '../../components/formONG/';
import { FaRegEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

function SignUp() {
  const [step, setStep] = useState('initial'); // initial, roleSelection, formONG, formVol
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'E-mail inválido';
  };

  const validatePassword = (password) => {
    return password.length >= 6 ? '' : 'A senha deve ter pelo menos 6 caracteres';
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError =
      formData.password === formData.confirmPassword ? '' : 'As senhas não coincidem';

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({
        email: !formData.email ? 'Campo obrigatório' : '',
        password: !formData.password ? 'Campo obrigatório' : '',
        confirmPassword: !formData.confirmPassword ? 'Campo obrigatório' : '',
      });
      return;
    }

    setErrors({ email: '', password: '', confirmPassword: '' });
    setStep('roleSelection');
  };

  const handleRoleSelection = (selectedRole) => {
    setStep(selectedRole === 'ONG' ? 'formONG' : 'formVol');
  };

  const handleFormSubmit = (data) => {
    const { confirmPassword, ...restFormData } = formData; // Exclui confirmPassword
    const combinedData = { ...restFormData, ...data };
    console.log('Dados combinados:', JSON.stringify(combinedData, null, 2));
    navigate(data.role === 'ONG' ? '/dashboard-ong' : '/dashboard-voluntario', {
      state: combinedData,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.leftPanel}>
        <h1 className={style.logo}>ONGFLOW</h1>
      </div>
      <div className={style.rightPanel}>
        {step === 'initial' && (
          <div className={style.containerForm}>
            <div className={style.containerFormHeader}>
              <div className={style.title}>
                <h1>Bem-vindo</h1>
                <p>Cadastre-se para começar</p>
              </div>
              <div className={style.progress}>
                <p>1/2</p>
              </div>
            </div>
            <form onSubmit={handleInitialSubmit}>
              <div className={style.containerFormInput}>
                <div className={style.inputGroup}>
                  <FaRegEnvelope className={style.icon} />
                  <input
                    type="email"
                    placeholder="Endereço de Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && <p className={style.error}>{errors.email}</p>}
                <div className={style.inputGroup}>
                  <FaLock className={style.icon} />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {errors.password && <p className={style.error}>{errors.password}</p>}
                <div className={style.inputGroup}>
                  <FaLock className={style.icon} />
                  <input
                    type="password"
                    placeholder="Confirme sua Senha"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
                {errors.confirmPassword && <p className={style.error}>{errors.confirmPassword}</p>}
                <p className={style.loginLink}>
                  Já tem conta? <a href="">Faça Login</a>
                </p>
              </div>
              <div className={style.containerFormButton}>
                <button type="submit" className={`${style.submitButton} ${style.fullWidth}`}>
                  <FaArrowRight className={style.icon} />
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 'roleSelection' && (
          <div className={style.containerForm}>
            <div className={style.containerFormHeader}>
              <div className={style.title}>
                <h1>Escolha seu tipo de cadastro</h1>
                <p>Você é uma ONG ou Voluntário?</p>
              </div>
              <div className={style.progress}>
                <p>2/2</p>
              </div>
            </div>
            <div className={style.containerFormButton}>
              <button
                onClick={() => handleRoleSelection('ONG')}
                className={`${style.submitButton} ${style.fullWidth}`}
              >
                ONG
              </button>
              <button
                onClick={() => handleRoleSelection('Voluntario')}
                className={`${style.submitButton} ${style.fullWidth}`}
              >
                Voluntário
              </button>
            </div>
          </div>
        )}
        {step === 'formONG' && <FormONG onSubmit={handleFormSubmit} />}
        {step === 'formVol' && <FormVol onSubmit={handleFormSubmit} />}
      </div>
    </div>
  );
}

export default SignUp;