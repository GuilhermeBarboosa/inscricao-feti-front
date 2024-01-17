import { DefaultDto } from "./defaultDto";
import { Role } from "./role";

export interface User extends DefaultDto{
    name: string;
    email: string;
    password: string;
    idRole: number;
    role: string;
}
