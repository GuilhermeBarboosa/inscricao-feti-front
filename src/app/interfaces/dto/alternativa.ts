import { DefaultDto } from "./defaultDto";

export interface Alternativa extends DefaultDto{
    alternativa: string;
    pontuacao: number;
    idPergunta: number;
    pergunta: string;
}
