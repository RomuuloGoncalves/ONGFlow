import { useState } from 'react';
import style from './formVol.module.css';
import { FaUser, FaPhone, FaHashtag, FaCalendarAlt } from 'react-icons/fa';

function FormVol({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
  });
  const [errors, setErrors] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
  });

  const validateCPF = (cpf) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf) ? '' : 'CPF inválido (formato: 123.456.789-00)';
  };

  const validateTelefone = (telefone) => {
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return telefoneRegex.test(telefone) ? '' : 'Telefone inválido (formato: (11) 99999-9999)';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      nome: formData.nome ? '' : 'Campo obrigatório',
      telefone: formData.telefone ? validateTelefone(formData.telefone) : 'Campo obrigatório',
      cpf: formData.cpf ? validateCPF(formData.cpf) : 'Campo obrigatório',
      dataNascimento: formData.dataNascimento ? '' : 'Campo obrigatório',
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setErrors({ nome: '', telefone: '', cpf: '', dataNascimento: '' });
    onSubmit({ ...formData, role: 'Voluntario' });
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.header}>
        <span className={style.backArrow}>&lt;</span>
        <h2>Cadastro Voluntário</h2>
        <span className={style.progress}>2/2</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <FaUser className={style.icon} />
          <input
            type="text"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>
        {errors.nome && <p className={style.error}>{errors.nome}</p>}
        <div className={style.inputGroup}>
          <FaPhone className={style.icon} />
          <input
            type="tel"
            placeholder="Telefone (Ex: (11) 99999-9999)"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          />
        </div>
        {errors.telefone && <p className={style.error}>{errors.telefone}</p>}
        <div className={style.inputGroup}>
          <FaHashtag className={style.icon} />
          <input
            type="text"
            placeholder="Seu CPF (Ex: 123.456.789-00)"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>
        {errors.cpf && <p className={style.error}>{errors.cpf}</p>}
        <div className={style.inputGroup}>
          <FaCalendarAlt className={style.icon} />
          <input
            type="text"
            placeholder="Data de Nascimento"
            value={formData.dataNascimento}
            onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>
        {errors.dataNascimento && <p className={style.error}>{errors.dataNascimento}</p>}
        <button className={`${style.submitButton} ${style.fullWidth}`}>
          Cadastrar-se
        </button>
      </form>
    </div>
  );
}

export default FormVol;