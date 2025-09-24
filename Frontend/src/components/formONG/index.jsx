import { useState } from 'react';
import style from './formONG.module.css';
import { FaUser, FaPhone, FaHashtag, FaCalendarAlt } from 'react-icons/fa';

function FormONG({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cnpj: '',
    dataFundacao: '',
  });
  const [errors, setErrors] = useState({
    nome: '',
    endereco: '',
    cnpj: '',
    dataFundacao: '',
  });

  const validateCNPJ = (cnpj) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj) ? '' : 'CNPJ inválido (formato: 00.000.000/0000-00)';
  };

  const validateEndereco = (endereco) => {
    return endereco.length >= 10 ? '' : 'Endereço deve ter pelo menos 10 caracteres';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      nome: formData.nome ? '' : 'Campo obrigatório',
      endereco: formData.endereco ? validateEndereco(formData.endereco) : 'Campo obrigatório',
      cnpj: formData.cnpj ? validateCNPJ(formData.cnpj) : 'Campo obrigatório',
      dataFundacao: formData.dataFundacao ? '' : 'Campo obrigatório',
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setErrors({ nome: '', endereco: '', cnpj: '', dataFundacao: '' });
    onSubmit({ ...formData, role: 'ONG' });
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.header}>
        <span className={style.backArrow}>&lt;</span>
        <h2>Cadastro ONG</h2>
        <span className={style.progress}>2/2</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <FaUser className={style.icon} />
          <input
            type="text"
            placeholder="Nome ONG"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>
        {errors.nome && <p className={style.error}>{errors.nome}</p>}
        <div className={style.inputGroup}>
          <FaPhone className={style.icon} />
          <input
            type="text"
            placeholder="Endereço (Ex: Rua das Flores, 123 - Centro, São Paulo - 01001-000)"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          />
        </div>
        {errors.endereco && <p className={style.error}>{errors.endereco}</p>}
        <div className={style.inputGroup}>
          <FaHashtag className={style.icon} />
          <input
            type="text"
            placeholder="CNPJ (Ex: 00.000.000/0000-00)"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
          />
        </div>
        {errors.cnpj && <p className={style.error}>{errors.cnpj}</p>}
        <div className={style.inputGroup}>
          <FaCalendarAlt className={style.icon} />
          <input
            type="text"
            placeholder="Data Fundação"
            value={formData.dataFundacao}
            onChange={(e) => setFormData({ ...formData, dataFundacao: e.target.value })}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>
        {errors.dataFundacao && <p className={style.error}>{errors.dataFundacao}</p>}
        <button className={`${style.submitButton} ${style.fullWidth}`}>
          Cadastrar-se
        </button>
      </form>
    </div>
  );
}

export default FormONG;