import serverService from "./serverService";
import type { AxiosPromise } from "axios";
import type { Projeto } from "../interfaces/projeto";
import type { Convite } from "../interfaces/convite";

interface DashboardData {
  stats: {
    projetosAtivos: number;
    projetosFinalizados: number;
    voluntariosAtivos: number;
  };
  voluntariosAtivos: Convite[];
  voluntariosDisponiveis: Convite[];
  projetosAtivos: Projeto[];
  projetosFinalizados: Projeto[];
}

const dashboardService = {
  getDashboardData: (): AxiosPromise<DashboardData> => {
    return serverService.get<DashboardData>("/ongs/dashboard");
  },
};

export default dashboardService;
