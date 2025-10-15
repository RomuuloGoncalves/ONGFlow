import React, { useState, useEffect } from 'react';

interface IconProps {
  className?: string;
}

interface FormOngProps {
  aoAlterar: (dados: any) => void;
  styles: { [key: string]: string };
  errors?: { [key: string]: string };
}

const IconeUsuario: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const IconePassword: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const IconeData: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const IconeOng: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const IconeCnpj: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const IconeSigla: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>);

const FormOng: React.FC<FormOngProps> = ({ aoAlterar, styles, errors = {} }) => {
  const [dados, setDados] = useState({
    nome: '',
    login: '',
    password: '',
    nome_fantasia: '',
    cnpj: '',
    sigla: '',
    data_fundacao: ''
  });

  useEffect(() => {
    aoAlterar(dados);
  }, [dados, aoAlterar]);

  const manipularMudanca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados(dadosAtuais => ({ ...dadosAtuais, [name]: value }));
  };

  return (
    <div className={styles.containerInputsOng}>
      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeUsuario className={styles.icone} />
          <input type="text" name="nome" placeholder="Nome da ONG" value={dados.nome} onChange={manipularMudanca} />
        </div>
        {errors.nome && <span className={styles.mensagemErroCampo}>{errors.nome}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeOng className={styles.icone} />
          <input type="text" name="nome_fantasia" placeholder="Nome Fantasia da ONG" value={dados.nome_fantasia} onChange={manipularMudanca} />
        </div>
        {errors.nome_fantasia && <span className={styles.mensagemErroCampo}>{errors.nome_fantasia}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeCnpj className={styles.icone} />
          <input type="text" name="cnpj" placeholder="CNPJ (apenas números)" value={dados.cnpj} onChange={manipularMudanca} />
        </div>
        {errors.cnpj && <span className={styles.mensagemErroCampo}>{errors.cnpj}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeSigla className={styles.icone} />
          <input type="text" name="sigla" placeholder="Sigla" value={dados.sigla} onChange={manipularMudanca} />
        </div>
        {errors.sigla && <span className={styles.mensagemErroCampo}>{errors.sigla}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeUsuario className={styles.icone} />
          <input type="text" name="login" placeholder="Email de acesso" value={dados.login} onChange={manipularMudanca} />
        </div>
        {errors.login && <span className={styles.mensagemErroCampo}>{errors.login}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconePassword className={styles.icone} />
          <input type="password" name="password" placeholder="Senha" value={dados.password} onChange={manipularMudanca} />
        </div>
        {errors.password && <span className={styles.mensagemErroCampo}>{errors.password}</span>}
      </div>

      <div className={styles.grupoInputContainer}>
        <div className={styles.grupoInput}>
          <IconeData className={styles.icone} />
          <input type="date" name="data_fundacao" value={dados.data_fundacao} onChange={manipularMudanca} />
        </div>
        {errors.data_fundacao && <span className={styles.mensagemErroCampo}>{errors.data_fundacao}</span>}
      </div>
    </div>
  );
}

export default FormOng;
