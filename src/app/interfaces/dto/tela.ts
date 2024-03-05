import { DefaultDto } from "./defaultDto";

export interface Tela extends DefaultDto{
    identificador: string;
    descricao: string;
    unica: boolean;
}
