import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleTelaService } from '../routes/role-tela.service';
import { TokenJwtService } from '../services/token-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService {
  permissionsVariablesSubject = new BehaviorSubject<any[]>([]);
  permissionsVariables$ = this.permissionsVariablesSubject.asObservable();

  role: any;

  constructor(
    private roleTelaService: RoleTelaService,
    private tokenJwtService: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.tokenJwtService.getIdRole();
    this.roleTelaService.getByRole(this.role).subscribe(
      (data: any) => {
        const response = JSON.parse(JSON.stringify(data));
        const permissionsVariables: any = [];

        response.forEach((element: any) => {
          permissionsVariables.push(element);
        });

        this.permissionsVariablesSubject.next(permissionsVariables);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
