export class PerguntaInput {
  pergunta: string | undefined;


  constructor(user: any) {
    this.pergunta = user.name;
  }
}
