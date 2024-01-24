import { PerguntaRespostaInput } from './pergunta_respostaInput';
import { Inscricao } from '../dto/inscricao';
export class InscricaoInput{
  edital:  number | undefined;
  funcao:  number | undefined;
  usuario:  number | undefined;
  perguntaResposta: PerguntaRespostaInput[] | undefined;

  constructor(listPerguntaResposta: PerguntaRespostaInput[], idEdital: any, idFuncao: any, idUser: any){
    this.edital = idEdital
    this.funcao = idFuncao
    this.usuario = idUser;
    this.perguntaResposta = listPerguntaResposta;
  }
}
