import Header from "@/components/Voluntario/Header/Header";
import style from "./PerfilVoluntario.module.css";
import { useState } from "react";
import SelectInput from '@/components/Voluntario/Select'

// Icons
import { Usuario } from "@/assets/icons/Usuario";
import { Email } from "@/assets/icons/Email";
import { Telefone } from "@/assets/icons/Telefone";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Sobre } from "@/assets/icons/Sobre";
import { Salvar } from "@/assets/icons/Salvar";

function PerfilVoluntario() {
  const [voluntario, setVoluntario] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    sobre: "",
    habilidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVoluntario((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header />
      <div className={style.container__perfil}>
        <div className={style.container__title}>
          <h1>Configuração de Perfil</h1>
          <p>Atualize suas informações de perfil.</p>
        </div>

          <form>
            {/* Nome */}
            <div className={style.container__form_input}>
                <div className={style.label}>
                    <Usuario/>
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
                    <Email/>
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
                    <Telefone/>
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
            <div className={style.container__form_input}>
                <div className={style.label}>
                    <Localizacao/>
                    <label> Endereço</label>
                </div>
              <input
                type="text"
                name="endereco"
                value={voluntario.endereco}
                onChange={handleChange}
                placeholder="Rua, Bairro Cidade  - Estado"
              />
            </div>
            {/* Sobre */}
            <div className={style.container__form_input}>
                <div className={style.label}>
                    <Sobre/>
                    <label> Sobre</label>
                </div>
              <input
                type="text"
                name="sobre"
                value={voluntario.sobre}
                onChange={handleChange}
                placeholder="Fale sobre você..."
              />
            </div>
            {/* Habilidade */}
            <SelectInput/>

            {/* Btn */}
            <button className={style.buttonSave}>
                <Salvar/>
                Salvar Alterações
            </button>
          </form>
        </div>
    </>
  );
}

export default PerfilVoluntario;
