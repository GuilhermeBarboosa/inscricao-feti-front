export class PerguntaRespostaInput{
  pergunta : number | undefined;
  perguntaResponse: string | undefined;
  alternativa : number | undefined;
  alternativaResponse: string | undefined;
  pontuacao: number | undefined;

  constructor(idPergunta: any, idAlternativa: any, pontuacao: any){
    this.pergunta = idPergunta
    this.alternativa = idAlternativa
    this.pontuacao = pontuacao;
  }
}
