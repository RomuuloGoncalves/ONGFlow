import Header from "@/components/Voluntario/Header/Header";
import style from "./PerfilVoluntario.module.css";
import { useEffect, useState } from "react";
import SelectInput from "@/components/Voluntario/MultiSelect";

// Icons
import { Usuario } from "@/assets/icons/Usuario";
import { Email } from "@/assets/icons/Email";
import { Telefone } from "@/assets/icons/Telefone";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Sobre } from "@/assets/icons/Sobre";
import { Salvar } from "@/assets/icons/Salvar";
import { Logout } from "@/assets/icons/Logout";
import { useNavigate } from "react-router-dom";
import voluntarioService from "@/services/voluntarioService";
import type { Endereco } from "@/interfaces/endereco";
import enderecoService from "@/services/enderecoService";
import type { Voluntario } from "@/interfaces/voluntario";
import type { Habilidade } from "@/interfaces/habilidade";
import { getHabilidades } from "@/services/projetoService";
import voluntarioHabilidadeService from "@/services/voluntarioHabilidade";
// falta a parte das habilidades
function PerfilVoluntario() {

const [voluntario, setVoluntario] = useState<Voluntario>({
  id: 0,
  nome: '',
  email: '',
  // senha: '',
  cpf: '',
  data_nascimento: '',
  telefone: '',
  bio: '',
  status: 'ativo',
  id_endereco: 0,
});

const [endereco, setEndereco] = useState<Endereco>({
  id: 0,
  cep: '',
  logradouro: '',
  numero: 0,
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
});

const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
const [selectedHabilidades, setSelectedHabilidades] = useState<number[]>([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData) {
      setVoluntario((prev) => ({
        ...prev,
        id: userData.id || 0,
        nome: userData.nome || "",
        email: userData.email || "",
        cpf: userData.cpf || "",
        bio: userData.bio || "",
        telefone: userData.telefone || "",
        data_nascimento: userData.data_nascimento || "",
        id_endereco: userData.id_endereco || "",
      }));
    }

if (userData.id_endereco) {
        enderecoService.getEndereco(userData.id_endereco).then((res) => {
          const enderecoData = res.data.data;
          setEndereco({
            id: enderecoData.id || 0,
            cep: enderecoData.cep || "",
            logradouro: enderecoData.logradouro || "",
            numero: enderecoData.numero || 0,
            complemento: enderecoData.complemento || "",
            bairro: enderecoData.bairro || "",
            cidade: enderecoData.cidade || "",
            estado: enderecoData.estado || "",
          });
        });
      }
  async function fetchHabilidades() {
    try {
      const response = await getHabilidades();
      setHabilidades(response.data); 
    } catch (error) {
      console.error("Erro ao carregar habilidades:", error);
    }
  }

  fetchHabilidades();

  async function carregarHabilidades() {
    try {
      const response = await voluntarioHabilidadeService.getByVoluntario(userData.id);
      
      const lista = response.data.data;
      const ids = lista.map((h: any) => h.id);

      setSelectedHabilidades(ids);
    } catch (error) {
      console.error("Erro ao carregar habilidades:", error);
    }
  }

  if (userData.id) {
    carregarHabilidades();
  }

}, []);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    let enderecoId = endereco.id;

    if (enderecoId) {
      await enderecoService.updateEndereco(enderecoId, endereco);
    } else {
      const responseNovoEndereco = await enderecoService.createEndereco(endereco);
      enderecoId = responseNovoEndereco.data.data.id;
      voluntario.id_endereco = enderecoId;
    }

    const responseVoluntario = await voluntarioService.updateVoluntario(
      voluntario.id,
      voluntario
    );

    localStorage.setItem("user", JSON.stringify(responseVoluntario.data.data));

    console.log("Voluntário atualizado com sucesso!");
        await voluntarioHabilidadeService.syncHabilidades(
      voluntario.id,
      selectedHabilidades
    );

  } catch (error) {
    console.error("Erro ao atualizar voluntário, endereço ou habilidades:", error);
  }
}


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVoluntario((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEndereco = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setEndereco((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const navigate = useNavigate();
  function handleClickSair() {
    navigate("/home/voluntario")
  }

  return (
    <>
      <Header />
      <div className={style.container__perfil}>
        <div className={style.container__title}>
          <h1>Configuração de Perfil</h1>
          <p>Atualize suas informações de perfil.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Usuario />
              <label> Nome</label>
            </div>
            <input
              type="text"
              name="nome"
              value={voluntario.nome}
              onChange={handleChange}
              placeholder="Nome"
            />
          </div>
          {/* Email */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Email />
              <label> Email</label>
            </div>
            <input
              type="text"
              name="email"
              value={voluntario.email}
              onChange={handleChange}
              placeholder="Email@gmail.com"
            />
          </div>
          {/* Telefone */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Telefone />
              <label> Telefone</label>
            </div>
            <input
              type="text"
              name="telefone"
              value={voluntario.telefone}
              onChange={handleChange}
              placeholder="+1(555) 1234-56789"
            />
          </div>
          {/* Endereço */}
          <div className={style.endereco}>
            <div className={style.endereco__title}>
              <Localizacao />
              <h1>Endereço</h1>
            </div>
            <div className={style.endereco__cep_numero}>
              <div className={style.endereco__cep}>
                <div className={style.label}>
                  <label>CEP</label>
                </div>
                <input 
                type="text"
                name="cep" 
                placeholder="12345-678"
                value={endereco.cep}
                onChange={handleChangeEndereco} />
              </div>
              <div className={style.endereco__numero}>
                <div className={style.label}>
                  <label>Número</label>
                </div>
                <input 
                type="number"
                name="numero" 
                placeholder="1234" 
                value={endereco.numero}
                onChange={handleChangeEndereco}/>
              </div>
            </div>
            <div className={style.endereco__logradouro}>
              <div className={style.label}>
                <label>Logradouro</label>
              </div>
              <input 
              type="text"
              name="logradouro" 
              placeholder="Jucelino" 
              value={endereco.logradouro}
              onChange={handleChangeEndereco}/>
            </div>
            <div className={style.endereco__bairro_cidade__estado}>
              <div className={style.endereco__bairro}>
                <div className={style.label}>
                  <label>Bairro</label>
                </div>
                <input 
                type="text"
                name="bairro" 
                placeholder="Bairro" 
                value={endereco.bairro}
                onChange={handleChangeEndereco}/>
              </div>
              <div className={style.endereco__cidade}>
                <div className={style.label}>
                  <label>Cidade</label>
                </div>
                <input 
                type="text"
                name="cidade" 
                placeholder="cidade" 
                value={endereco.cidade}
                onChange={handleChangeEndereco}/>
              </div>
              <div className={style.endereco__estado}>
                <div className={style.label}>
                  <label>Estado</label>
                </div>
                <input 
                type="text"
                name="estado" 
                placeholder="estado" 
                value={endereco.estado}
                onChange={handleChangeEndereco}/>
              </div>
            </div>
          </div>

          {/* Sobre */}
          <div className={style.container__form_input}>
            <div className={style.label}>
              <Sobre />
              <label> Sobre</label>
            </div>
            <input
              type="text"
              name="bio"
              value={voluntario.bio}
              onChange={handleChange}
              placeholder="Fale sobre você..."
            />
          </div>
          {/* Habilidade */}
          <SelectInput
            options={habilidades}
            value={selectedHabilidades}
            onChange={(values) => setSelectedHabilidades(values)}
          />

          <hr />
          <div className={style.container__buttons}>
            {/* Btn */}
            <button className={style.buttonSave} type="submit">
              <Salvar />
              Salvar Alterações
            </button>
            <button className={style.buttonLogout} onClick={handleClickSair}>
              <Logout />
              Sair
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PerfilVoluntario;
