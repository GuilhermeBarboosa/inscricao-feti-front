export class EditalInput {
  edital: string | undefined;

  data_inicio: string | undefined;

  data_fim: string | undefined;

  qtd_vagas: number | undefined;

  arquivo: string | undefined;

  constructor(funcao: any) {
    this.edital = funcao.edital;
    this.data_inicio = funcao.data_inicio;
    this.data_fim = funcao.data_fim;
    this.qtd_vagas = funcao.qtd_vagas;
    this.arquivo = funcao.arquivo;
  }
}
