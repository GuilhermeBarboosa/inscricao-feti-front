import { DefaultDto } from "./defaultDto";
import { InscricaoResposta } from "./inscricaoResposta";

export interface Inscricao extends DefaultDto{
   id: number,
   idUser: number,
   user: string;
   idEdital: number,
   edital: string;
   idFuncao: number,
   funcao: string;
   pontuacao: number;
   inscricaoResposta: InscricaoResposta[];
}
