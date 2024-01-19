export class PerguntaRespostaInput{
  pergunta : number | undefined;
  alternativa : number | undefined;
  pontuacao: number | undefined;

  constructor(idPergunta: any, idAlternativa: any, pontuacao: any){
    this.pergunta = idPergunta
    this.alternativa = idAlternativa
    this.pontuacao = pontuacao;
  }
}
