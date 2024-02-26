export class EditalInput {
  edital: string | undefined;

  data_inicio: string | undefined;

  data_fim: string | undefined;

  qtd_vagas: number | undefined;

  arquivo:  File = new File([], '');
  constructor(edital: any) {
    this.edital = edital.edital;
    this.data_inicio = edital.data_inicio;
    this.data_fim = edital.data_fim;
    this.qtd_vagas = edital.qtd_vagas;

    if (edital.arquivo !== null && edital.arquivo !== undefined) {
      this.arquivo = edital.arquivo as File;
    }
  }
}
