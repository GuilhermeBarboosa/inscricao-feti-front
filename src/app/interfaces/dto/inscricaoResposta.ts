import { DefaultDto } from './defaultDto';

export interface InscricaoResposta extends DefaultDto {
  id: number;
  idInscricao: number;
  idPergunta: number;
  pergunta: string;
  idAlternativa: number;
  alternativa: string;
  pontuacao: number;
}
