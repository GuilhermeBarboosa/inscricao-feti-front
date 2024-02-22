import { DefaultDto } from './defaultDto';

export interface Funcao extends DefaultDto {
  funcao: string;

  idEdital: number;
  edital: string;
}
