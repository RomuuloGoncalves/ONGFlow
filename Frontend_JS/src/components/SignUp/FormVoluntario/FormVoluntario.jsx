import React, { useState, useEffect } from 'react';

const IconeUsuario = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const IconeEmail = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const IconeSenha = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const IconeCpf = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>);
const IconeTelefone = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const IconeData = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);

function FormVoluntario({ aoAlterar, styles, errors = {} }) {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    password: '',
    cpf: '',
    data_nascimento: '',
    telefone: '',
    bio: ''
  });

  useEffect(() => {
    aoAlterar(dados);
  }, [dados, aoAlterar]);

  const manipularMudanca = (e) => {
    const { name, value } = e.target;
    setDados(dadosAtuais => ({ ...dadosAtuais, [name]: value }));
  };

  return (
    <>
      <div className={styles.containerInputsVoluntario}>
        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeUsuario className={styles.icone} />
            <input type="text" name="nome" placeholder="Nome Completo" value={dados.nome} onChange={manipularMudanca} />
          </div>
          {errors.nome && <span className={styles.mensagemErroCampo}>{errors.nome}</span>}
        </div>

        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeEmail className={styles.icone} />
            <input type="email" name="email" placeholder="Endereço de Email" value={dados.email} onChange={manipularMudanca} />
          </div>
          {errors.email && <span className={styles.mensagemErroCampo}>{errors.email}</span>}
        </div>

        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeSenha className={styles.icone} />
            <input type="password" name="password" placeholder="Senha" value={dados.password} onChange={manipularMudanca} />
          </div>
          {errors.password && <span className={styles.mensagemErroCampo}>{errors.password}</span>}
        </div>

        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeCpf className={styles.icone} />
            <input type="text" name="cpf" placeholder="CPF" value={dados.cpf} onChange={manipularMudanca} />
          </div>
          {errors.cpf && <span className={styles.mensagemErroCampo}>{errors.cpf}</span>}
        </div>

        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeData className={styles.icone} />
            <input type="date" name="data_nascimento" placeholder="Data de Nascimento" value={dados.data_nascimento} onChange={manipularMudanca} />
          </div>
          {errors.data_nascimento && <span className={styles.mensagemErroCampo}>{errors.data_nascimento}</span>}
        </div>

        <div className={styles.grupoInputContainer}>
          <div className={styles.grupoInput}>
            <IconeTelefone className={styles.icone} />
            <input type="tel" name="telefone" placeholder="Telefone" value={dados.telefone} onChange={manipularMudanca} />
          </div>
          {errors.telefone && <span className={styles.mensagemErroCampo}>{errors.telefone}</span>}
        </div>

      </div>
    </>
  );
}

export default FormVoluntario;