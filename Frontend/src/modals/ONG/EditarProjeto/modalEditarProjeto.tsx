import { Fechar } from "@/assets/icons/Fechar";
import style from "./modalEditarProjeto.module.css";
import SelectInput from "@/components/Voluntario/MultiSelect";

import { Salvar } from "@/assets/icons/Salvar";
import DateCalendar from '@/components/ui/DateCalendar'
import  Clock  from "@/components/ui/Clock"


interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function modalCriarProjeto({ isOpen, setIsOpen }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>Edite as informações do projeto</h1>
        </div>
        <div className={style.modal__body}>
          <div className={style.name}>
            <label>Nome do projeto</label>
            <input type="text" placeholder="Digite o nome do projeto" />
          </div>
          <div className={style.description}>
            <label>Descrição</label>
            <textarea placeholder="Dê uma descrição para o projeto" />
          </div>
          <div className={style.habilities}>
            <SelectInput />
          </div>
          <div className={style.location}>
            <label>Localização</label>
            <input type="text" placeholder="Digite a localização do projeto" />
          </div>
          <div className={style.date__time}>
            <div className={style.date}>
              <label>Data Início</label>
              <DateCalendar />
            </div>
            <div className={style.time}>
              <label>Hora Inicio</label>
              <Clock />
            </div>
          </div>
        </div>

        <div className={style.modal__footer}>
          <button className={`${style.button} ${style.buttonCancel}`} onClick={() => setIsOpen(false)}>
            <Fechar />
            Cancelar
          </button>
          <button className={`${style.button} ${style.buttonSave}`}>
            <Salvar />
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default modalCriarProjeto;
