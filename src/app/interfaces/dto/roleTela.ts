import { DefaultDto } from "./defaultDto";

export interface RoleTela extends DefaultDto{
    id: number;
    idTela: number;
    identificador: string;
    descricao: string;
    idRole: number;
    role: string;
}
