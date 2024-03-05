import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleTelaService } from '../routes/role-tela.service';
import { TokenJwtService } from '../services/token-jwt.service';
import { RoleTela } from '../interfaces/dto/roleTela';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuardService {
  permissionsVariablesSubject = new BehaviorSubject<any[]>([]);
  permissionsVariables$ = this.permissionsVariablesSubject.asObservable();

  pemissaoIdSubject = new BehaviorSubject<number | null>(null);
  pemissaoId$: Observable<number | null> =
    this.pemissaoIdSubject.asObservable();

  createdSubject = new BehaviorSubject<boolean | null>(null);
  created$: Observable<boolean | null> = this.createdSubject.asObservable();

  infoSubject = new BehaviorSubject<boolean | null>(null);
  info$: Observable<boolean | null> = this.infoSubject.asObservable();

  editSubject = new BehaviorSubject<boolean | null>(null);
  edit$: Observable<boolean | null> = this.editSubject.asObservable();

  deleteSubject = new BehaviorSubject<boolean | null>(null);
  delete$: Observable<boolean | null> = this.deleteSubject.asObservable();

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

  setPermissions(roleTela: RoleTela) {
    this.pemissaoIdSubject.next(roleTela.idPermissao);
  }

  getPermissions() {
    return this.pemissaoId$;
  }

  verifyPermissions() {
    type PermissionConfig = {
      [key: number]: {
        created: boolean;
        edit: boolean;
        info: boolean;
        delete: boolean;
      };
    };

    const config: PermissionConfig = {
      1: { created: false, edit: false, info: true, delete: false },
      2: { created: true, edit: false, info: true, delete: false },
      3: { created: true, edit: true, info: true, delete: false },
      4: { created: true, edit: true, info: true, delete: true },
      0: { created: false, edit: false, info: false, delete: false },
    };
    let permission = config[0];
    this.getPermissions().subscribe((res) => {
      if (res === null) config[0];
      permission = config[res!];

      if (this.role === 1) {
        permission = config[4];
      }
      this.createdSubject.next(permission.created);
      this.editSubject.next(permission.edit);
      this.infoSubject.next(permission.info);
      this.deleteSubject.next(permission.delete);
    });
  }
}
