import { DefaultDto } from './defaultDto';
import { InscricaoResposta } from './inscricaoResposta';

export interface Inscricao extends DefaultDto {
  id: number;
  idUser: number;
  user: string;
  cpf: string;
  email: string;
  telefone: string;
  data_de_nascimento: string;
  idEdital: number;
  edital: string;
  idFuncao: number;
  funcao: string;
  pontuacao: number;
  situacao: string;
  inscricaoResposta: InscricaoResposta[];
}
