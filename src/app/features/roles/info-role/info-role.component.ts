import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Role } from 'src/app/interfaces/dto/role';
import { RoleService } from 'src/app/routes/role.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';
@Component({
  selector: 'app-info-role',
  templateUrl: './info-role.component.html',
  styleUrls: ['./info-role.component.css'],
})
export class InfoRoleComponent implements OnInit {
  formulario!: FormGroup;
  role?: Role;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';

  constructor(
    private activedRouter: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private telaService: TelaService,
    public permissionService: PermissionsGuardService
  ) {}

  async ngOnInit() {
    this.roleService.getById(this.id).subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.role = roleResponse;
        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.role?.id, disabled: this.isDisabled }],
      role: [
        { value: this.role?.role, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`role/edit/${this.id}`);
  }

  return() {
    this.router.navigateByUrl(`/role`);
  }

  remove() {
    // this.roleService.delete(this.id).subscribe(
    //   (data) => {
    //     this.notifier.showError('Funcao removido com sucesso!');
    //     this.router.navigateByUrl(`/role/${this.id}`);
    //   },
    //   (error) => {
    //     this.notifier.showError(error.error);
    //   }
    // );
  }
}
