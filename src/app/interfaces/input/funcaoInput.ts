export class FuncaoInput {
  funcao: string | undefined;
  edital: number | undefined;

  constructor(funcao: any) {
    this.funcao = funcao.funcao;
    this.edital = funcao.edital;
  }
}
