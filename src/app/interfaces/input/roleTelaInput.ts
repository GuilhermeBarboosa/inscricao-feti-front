export class RoleTelaInput {
   tela: number | undefined;
   role: number | undefined;

  constructor(roleTela: any) {
    this.tela = roleTela.funcao;
    this.role = roleTela.edital;
  }
}
