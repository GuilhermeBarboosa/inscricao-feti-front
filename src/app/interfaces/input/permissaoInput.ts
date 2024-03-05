export class PermissaoInput {
  permissao: string | undefined;

  constructor(permissao: any) {
    this.permissao = permissao.permissao;
  }
}
