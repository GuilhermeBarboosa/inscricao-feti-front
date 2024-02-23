import { ArquivoInput } from './arquivoInput';
import { InscricaoInput } from './inscricaoInput';
export class InscricaoWithArquivosInput{
  inscricaoInput!: InscricaoInput
  arquivoInscricaoInput!: ArquivoInput[]

  constructor(inscricaoInput: InscricaoInput, arquivoInscricaoInput: ArquivoInput[]){
    this.inscricaoInput = inscricaoInput;
    this.arquivoInscricaoInput = arquivoInscricaoInput;
  }
}
