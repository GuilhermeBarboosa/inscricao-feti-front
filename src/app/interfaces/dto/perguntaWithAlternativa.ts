import { Alternativa } from "./alternativa";
import { DefaultDto } from "./defaultDto";

export interface perguntaWithAlternativa extends DefaultDto{
    idPergunta: number;
    pergunta: string;
    listAlternativas: Alternativa[];
}
