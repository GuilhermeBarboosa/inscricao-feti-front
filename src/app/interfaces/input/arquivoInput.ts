export class ArquivoInput {
  nome_arquivo: string | undefined;

  constructor(arquivo: any) {
    this.nome_arquivo = arquivo.nome_arquivo;

  }
}
