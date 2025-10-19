import type { AxiosPromise } from "axios";
import api from "./api";
import type { Convite } from "../interfaces/convite";

interface ConviteActionResponse {
  message: string;
}

const conviteService = {
  getConvitesVoluntario: (
    idVoluntario: number
  ): AxiosPromise<Convite[]> => {
    return api.get<Convite[]>(`/voluntarios/${idVoluntario}/convites`);
  },

  aceitarConvite: (idConvite: number): AxiosPromise<ConviteActionResponse> => {
    return api.put<ConviteActionResponse>(`/convites/${idConvite}/aceitar`);
  },

  recusarConvite: (idConvite: number): AxiosPromise<ConviteActionResponse> => {
    return api.put<ConviteActionResponse>(`/convites/${idConvite}/recusar`);
  },
};

export default conviteService;
