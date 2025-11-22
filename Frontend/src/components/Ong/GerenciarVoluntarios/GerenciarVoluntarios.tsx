import { useState, useEffect } from 'react';
import style from './GerenciarVoluntarios.module.css';
import type { Voluntario } from '@/interfaces/voluntario';
import voluntarioService from '@/services/voluntarioService';
import { 
  adicionarVoluntarioAoProjeto as adicionarVoluntario, 
  removerVoluntarioDoProjeto as removerVoluntario 
} from '@/services/projetoService';
import { Mais } from '@/assets/icons/Mais';
import { Fechar } from '@/assets/icons/Fechar';
import useCustomToast from "@/components/ui/use-toast";

interface GerenciarVoluntariosProps {
  projetoId: number;
}

function GerenciarVoluntarios({ projetoId }: GerenciarVoluntariosProps) {
  const [voluntariosNoProjeto, setVoluntariosNoProjeto] = useState<Voluntario[]>([]);
  const [voluntariosCompativeis, setVoluntariosCompativeis] = useState<Voluntario[]>([]);
  const { showToast } = useCustomToast();

  const fetchVoluntarios = async () => {
    try {
      const [projetoVoluntariosRes, compativeisVoluntariosRes] = await Promise.all([
        voluntarioService.getVoluntariosPorProjeto(projetoId),
        voluntarioService.getVoluntariosCompativeis(projetoId),
      ]);
      setVoluntariosNoProjeto(projetoVoluntariosRes.data.data);
      setVoluntariosCompativeis(compativeisVoluntariosRes.data.data);
    } catch (error) {
      console.error('Erro ao buscar voluntários:', error);
      showToast("Falha ao carregar voluntários", "error");
    }
  };

  useEffect(() => {
    fetchVoluntarios();
  }, [projetoId]);

  const handleAddVoluntario = async (voluntario: Voluntario) => {
    try {
      await adicionarVoluntario(projetoId, voluntario.id);
      showToast("Voluntário adicionado com sucesso!", "success");
      // Atualiza as listas dinamicamente
      setVoluntariosNoProjeto([...voluntariosNoProjeto, voluntario]);
      setVoluntariosCompativeis(voluntariosCompativeis.filter(v => v.id !== voluntario.id));
    } catch (error) {
      console.error('Erro ao adicionar voluntário:', error);
      showToast("Erro ao adicionar voluntário", "error");
    }
  };

  const handleRemoveVoluntario = async (voluntario: Voluntario) => {
    try {
      await removerVoluntario(projetoId, voluntario.id);
      showToast("Voluntário removido com sucesso!", "success");
      // Atualiza as listas dinamicamente
      setVoluntariosNoProjeto(voluntariosNoProjeto.filter(v => v.id !== voluntario.id));
      setVoluntariosCompativeis([voluntario, ...voluntariosCompativeis]);
    } catch (error) {
      console.error('Erro ao remover voluntário:', error);
      showToast("Erro ao remover voluntário", "error");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.column}>
        <h2>Voluntários no Projeto</h2>
        {voluntariosNoProjeto.length > 0 ? (
          <ul className={style.list}>
            {voluntariosNoProjeto.map((voluntario) => (
              <li key={voluntario.id} className={style.listItem}>
                <span>{voluntario.nome}</span>
                <button onClick={() => handleRemoveVoluntario(voluntario)} className={`${style.actionButton} ${style.removeButton}`}>
                  <Fechar />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum voluntário neste projeto ainda.</p>
        )}
      </div>
      <div className={style.column}>
        <h2>Voluntários Compatíveis</h2>
        {voluntariosCompativeis.length > 0 ? (
          <ul className={style.list}>
            {voluntariosCompativeis.map((voluntario) => (
              <li key={voluntario.id} className={style.listItem}>
                <div className={style.voluntarioInfo}>
                  <span>{voluntario.nome}</span>
                  <div className={style.habilidades}>
                    {voluntario.habilidades?.map(h => h.descricao).join(', ')}
                  </div>
                </div>
                <button onClick={() => handleAddVoluntario(voluntario)} className={style.actionButton}>
                  <Mais />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum voluntário compatível encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default GerenciarVoluntarios;
