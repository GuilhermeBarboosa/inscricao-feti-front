export class PerguntaInput {
  pergunta: string | undefined;
  funcao: number | undefined;

  constructor(pergunta: any) {
    this.pergunta = pergunta.pergunta;
    this.funcao = pergunta.funcao;
  }
}
