import { DefaultDto } from './defaultDto';

export interface Edital extends DefaultDto {
  edital: string;

  data_inicio: string;

  data_fim: string;

  qtd_vagas: number;

  arquivo: string;
}
