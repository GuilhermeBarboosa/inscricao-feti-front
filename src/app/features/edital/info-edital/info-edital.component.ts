import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Edital } from 'src/app/interfaces/dto/edital';
import { Role } from 'src/app/interfaces/dto/role';
import { EditalService } from 'src/app/routes/edital.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-info-edital',
  templateUrl: './info-edital.component.html',
  styleUrls: ['./info-edital.component.css'],
})
export class InfoEditalComponent implements OnInit {
  formulario!: FormGroup;
  edital?: Edital;
  roles?: Role[];
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';
  role = '';

  telasDefault: any = null;
  rolesDefault = roles;
  permissions: any = [];

  constructor(
    private activedRouter: ActivatedRoute,
    private editalService: EditalService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private telaService: TelaService,
    public permissionService: PermissionsGuardService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.editalService.getById(this.id).subscribe(
      (data) => {
        var editalResponse = JSON.parse(JSON.stringify(data));
        this.edital = editalResponse;

        this.edital!.data_inicio = this.utilsService.formatarData(
          this.edital?.data_inicio
        );
        this.edital!.data_fim = this.utilsService.formatarData(
          this.edital?.data_fim
        );
        this.edital!.created = this.utilsService.formatarData(
          this.edital!.created
        );
        this.edital!.updated = this.utilsService.formatarData(
          this.edital!.updated
        );

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );

    if (this.role == this.rolesDefault.ROLE_ADMIN) {
      this.permissions = this.telaService.telaAdmin;
    } else {
      this.permissionService.permissionsVariables$.subscribe((res) => {
        this.permissions = res;
      });
    }
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.edital?.id, disabled: this.isDisabled }],
      edital: [
        { value: this.edital?.edital, disabled: this.isDisabled },
        Validators.required,
      ],
      data_inicio: [
        { value: this.edital?.data_inicio, disabled: this.isDisabled },
        Validators.required,
      ],
      data_fim: [
        { value: this.edital?.data_fim, disabled: this.isDisabled },
        Validators.required,
      ],
      qtd_vagas: [
        { value: this.edital?.qtd_vagas, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.edital?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.edital?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`edital/edit/${this.id}`);
  }

  return() {
    this.router.navigateByUrl('/edital');
  }

  remove() {
    this.editalService.delete(this.id).subscribe(
      (data) => {
        this.notifier.showError('Edital removido com sucesso!');
        this.router.navigateByUrl('/edital');
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }
}
