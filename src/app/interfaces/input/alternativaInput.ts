export class AlternativaInput {
  alternativa: string;
  pontuacao: number;
  pergunta: string;

  constructor(alternativa: any) {
    this.alternativa = alternativa.alternativa;
    this.pontuacao = alternativa.pontuacao;
    this.pergunta = alternativa.pergunta;
  }
}
