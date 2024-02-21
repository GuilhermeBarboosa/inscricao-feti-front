export class ArquivoInput {
  nome_arquivo: string | undefined;
  inscricao: number | undefined;

  constructor(arquivo: any, idInscricao: any) {
    this.nome_arquivo = arquivo.nome_arquivo;
    this.inscricao = idInscricao;
  }
}
