import Header from "@/components/Ong/Header/Header";
import style from "./PerfilOng.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Email } from "@/assets/icons/Email";
import { Telefone } from "@/assets/icons/Telefone";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Sobre } from "@/assets/icons/Sobre";
import { Salvar } from "@/assets/icons/Salvar";
import { Logout } from "@/assets/icons/Logout";
import { HashTag } from "@/assets/icons/HashTag";

function PerfilOng() {
  return (
    <>
      <div className={style.main}>
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
                <Usuario />
                <label>Nome Fantasia</label>
              </div>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
              />
            </div>
            {/* CNPJ */}
            <div className={style.container__form_input}>
              <div className={style.label}>
                <HashTag />
                <label>CPNJ</label>
              </div>
              <input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0000-00"
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
                placeholder="+1(555) 1234-56789"
              />
            </div>
            {/* Sobre */}
            <div className={style.container__form_input}>
              <div className={style.label}>
                <Sobre />
                <label> Sobre</label>
              </div>
              <input
                type="text"
                name="sobre"  
                placeholder="Fale sobre você..."
              />
            </div>
            {/* Endereço */}
            <div className={style.container__form_endereco}>
              <div className={style.title_endereco}>
                <Localizacao />
                <h1>Endereço</h1>
              </div>
              {/* CEP e Numero */}
              <div className={style.container__cep_number}>
                <div className={style.container__form_input__cep}>
                  <div className={style.label}>
                    <label>CEP</label>
                  </div>
                  <input type="text" name="cep" placeholder="12345-678" />
                </div>
                <div className={style.container__form_input__number}>
                  <div className={style.label}>
                    <label>Número</label>
                  </div>
                  <input type="number" name="numero" placeholder="123" />
                </div>
              </div>
              {/* Logradouro */}
              <div className={style.container__form_input}>
                <div className={style.label}>
                  <label>Logradouro</label>
                </div>
                <input type="text" name="logradouro" placeholder="Jucelino" />
              </div>
              <div className={style.container__bairro_cidade__estado}>
                <div className={style.container__form_input__bairro}>
                  <div className={style.label}>
                    <label>Bairro</label>
                  </div>
                  <input type="text" name="bairro" placeholder="bairro" />
                </div>
                <div className={style.container__form_input__cidade}>
                  <div className={style.label}>
                    <label>Cidade</label>
                  </div>
                  <input type="text" name="cidade" placeholder="cidade" />
                </div>
                <div className={style.container__form_input__estado}>
                  <div className={style.label}>
                    <label>Estado</label>
                  </div>
                  <input type="text" name="estado" placeholder="estado" />
                </div>
              </div>
            </div>
            <hr />
            <div className={style.container__buttons}>
              {/* Btn */}
              <button className={style.buttonSave}>
                <Salvar />
                Salvar Alterações
              </button>
              <button className={style.buttonLogout}>
                <Logout />
                Sair
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PerfilOng;
