export class VerifyInput {
  idEdital: number | undefined;
  idUser: number | undefined;
  idFuncao: number | undefined;

  constructor(idEdital: number, idFuncao : number, idUser: number) {
   this.idEdital = idEdital;
   this.idUser =  idUser;
   this.idFuncao = idFuncao
  }
}
