import { Alternativa } from "./alternativa";
import { DefaultDto } from "./defaultDto";

export interface PerguntaWithAlternativa extends DefaultDto{
    idPergunta: number;
    pergunta: string;
    listAlternativas: Alternativa[];
}
