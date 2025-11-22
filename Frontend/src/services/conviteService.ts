import type { AxiosPromise } from "axios";
import api from "./api";
import type { Convite } from "../interfaces/convite";

interface ConviteActionResponse {
  message: string;
}

export interface ConvitePayload {
  iniciador: 'voluntario' | 'ong';
  status: 'pendente';
  mensagem: string;
  id_ong: number;
  id_voluntario: number;
  id_projeto: number;
}

export const getConvitesVoluntario = (
  idVoluntario: number
): AxiosPromise<Convite[]> => {
  return api.get<Convite[]>(`/voluntarios/${idVoluntario}/convites`);
};

export const getCandidaturasOng = (): AxiosPromise<Convite[]> => {
  return api.get<Convite[]>("/ongs/candidaturas");
};

export const enviarConvite = (data: ConvitePayload): AxiosPromise<Convite> => {
  return api.post<Convite>('/convites', data);
};

export const aceitarConvite = (idConvite: number): AxiosPromise<ConviteActionResponse> => {
  return api.put<ConviteActionResponse>(`/convites/${idConvite}/aceitar`);
};

export const recusarConvite = (idConvite: number): AxiosPromise<ConviteActionResponse> => {
  return api.put<ConviteActionResponse>(`/convites/${idConvite}/recusar`);
};
