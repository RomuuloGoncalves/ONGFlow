import Header from "@/components/Ong/Header/Header";
import style from "./PerfilOng.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Email } from "@/assets/icons/Email";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Salvar } from "@/assets/icons/Salvar";
import { Logout } from "@/assets/icons/Logout";
import { HashTag } from "@/assets/icons/HashTag";
import type { Ong } from "@/interfaces/ong";
import ongService from "@/services/ongService";
import { useEffect, useState } from "react";
import type { Endereco } from "@/interfaces/endereco";
import enderecoService from "@/services/enderecoService";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import useCustomToast from "@/components/ui/use-toast";


function PerfilOng() {
    const [ong, setOng] = useState<Ong>({
  id: 0,
  id_endereco: 0,
  email: "",
  senha: "",
  nome: "",
  nome_fantasia: "",
  cnpj: "",
  sigla: "",
  data_fundacao: "",
  // telefone: "",
  });

  const [endereco, setEndereco] = useState<Endereco>({
    id: 0,
    logradouro: "",
    numero: 0,
    // complemento: "",
    bairro: "", 
    cidade: "",
    estado: "",
    cep: "",
  });

  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  // Pré-carregamento
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (userData) {
      setOng((prev) => ({
        ...prev,
          id: userData.id || 0,
          id_endereco: userData.id_endereco || 0,
          email: userData.email || "",
          senha: userData.senha || "",
          nome: userData.nome || "",
          nome_fantasia: userData.nome_fantasia || "",
          cnpj: userData.cnpj || "",
          sigla: userData.sigla || "",
          data_fundacao: userData.data_fundacao || "",
          // telefone: userData.telefone || "",
      }));

      // Se houver endereço cadastrado, busca os dados
      if (userData.id_endereco) {
        enderecoService.getEndereco(userData.id_endereco).then((res) => {
          const enderecoData = res.data.data;
          setEndereco({
            id: enderecoData.id || 0,
            cep: enderecoData.cep || "",
            logradouro: enderecoData.logradouro || "",
            numero: enderecoData.numero || 0,
            // complemento: enderecoData.complemento || "",
            bairro: enderecoData.bairro || "",
            cidade: enderecoData.cidade || "",
            estado: enderecoData.estado || "",
          });
        });
      }
    }
  }, []);

   const handleChangeOng = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOng({ ...ong, [e.target.name]: e.target.value });
  };

  const handleChangeEndereco = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let enderecoId = endereco.id;

    if (enderecoId) {
      await enderecoService.updateEndereco(enderecoId, endereco);
    } else {
      const responseNovoEndereco = await enderecoService.createEndereco(endereco);
      enderecoId = responseNovoEndereco.data.data.id;
      ong.id_endereco = enderecoId;
    }

    const responseOng = await ongService.updateOng(ong.id, ong);

    localStorage.setItem("user", JSON.stringify(responseOng.data.data));

    showToast("Informações atualizadas com sucesso!", "success");

  } catch (error: any) {
    showError(error);
  }
};

const showError = (error: any) => {
        const erros: any = error.response.data.errors;
      for (const atributo in erros) {
        if (erros.hasOwnProperty(atributo)) {
          erros[atributo].forEach((erro: string) => {
          showToast(erro, "error");
        });
        }
    }
}

 return (
    <div className={style.main}>
      <Header />
      <div className={style.container__perfil}>
        <div className={style.container__title}>
          <h1>Configuração de Perfil</h1>
          <p>Atualize suas informações de perfil.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nome Fantasia */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Usuario />
              <label>Nome Fantasia</label>
            </div>
            <input
              type="text"
              name="nome"
              value={ong.nome}
              onChange={handleChangeOng}
            />
          </div>

          {/* CNPJ */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <HashTag />
              <label>CNPJ</label>
            </div>
            <input
              type="text"
              name="cnpj"
              value={ong.cnpj}
              onChange={handleChangeOng}
            />
          </div>

          {/* Email */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Email />
              <label>Email</label>
            </div>
            <input
              type="text"
              name="email"
              value={ong.email}
              onChange={handleChangeOng}
            />
          </div>

          {/* Telefone */}
          {/* nao existe na migration */}
          {/* <div className={style.container__form_input}>
            <div className={style.label}>
              <Telefone />
              <label>Telefone</label>
            </div>
            <input
              type="text"
              name="telefone"
              value={ong.telefone}
              onChange={handleChangeOng}
            />
          </div> */}

          {/* Sobre */}
          {/* nao existe no der e migration */}
          {/* <div className={style.container__form_input}>
            <div className={style.label}>
              <Sobre />
              <label>Sobre</label>
            </div>
            <input
              type="text"
              name="sobre"
              value={ong.sobre}
              onChange={handleChangeOng}
            />
          </div> */}

          {/* Endereço */}
          <div className={style.container__form_endereco}>
            <div className={style.title_endereco}>
              <Localizacao />
              <h1>Endereço</h1>
            </div>

            {/* CEP e Número */}
            <div className={style.container__cep_number}>
              <div className={style.container__form_input__cep}>
                <div className={style.label}><label>CEP</label></div>
                <input
                  type="text"
                  name="cep"
                  value={endereco.cep}
                  onChange={handleChangeEndereco}
                />
              </div>
              <div className={style.container__form_input__number}>
                <div className={style.label}><label>Número</label></div>
                <input
                  type="number"
                  name="numero"
                  value={endereco.numero}
                  onChange={handleChangeEndereco}
                />
              </div>
            </div>

            {/* Logradouro */}
            <div className={style.container__form_input}>
              <div className={style.label}><label>Logradouro</label></div>
              <input
                type="text"
                name="logradouro"
                value={endereco.logradouro}
                onChange={handleChangeEndereco}
              />
            </div>

            {/* Bairro, Cidade, Estado */}
            <div className={style.container__bairro_cidade__estado}>
              <div className={style.container__form_input__bairro}>
                <div className={style.label}><label>Bairro</label></div>
                <input
                  type="text"
                  name="bairro"
                  value={endereco.bairro}
                  onChange={handleChangeEndereco}
                />
              </div>
              <div className={style.container__form_input__cidade}>
                <div className={style.label}><label>Cidade</label></div>
                <input
                  type="text"
                  name="cidade"
                  value={endereco.cidade}
                  onChange={handleChangeEndereco}
                />
              </div>
              <div className={style.container__form_input__estado}>
                <div className={style.label}><label>Estado</label></div>
                <input
                  type="text"
                  name="estado"
                  value={endereco.estado}
                  onChange={handleChangeEndereco}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className={style.container__buttons}>
            <button type="submit" className={style.buttonSave}>
              <Salvar /> Salvar Alterações
            </button>
            <button type="button" className={style.buttonLogout} onClick={handleLogout}>
              <Logout /> Sair
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PerfilOng;
