import { DefaultDto } from './defaultDto';

export interface Arquivo extends DefaultDto {
  id: number;
  caminho_arquivo: string;

  idInscricao: number;
  idUser: number;
  user: string;
  idEdital: number;
  edital: string;
}
