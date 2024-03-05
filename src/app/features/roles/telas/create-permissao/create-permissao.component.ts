import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Tela } from '../../../../interfaces/dto/tela';

@Component({
  selector: 'app-create-permissao',
  templateUrl: './create-permissao.component.html',
  styleUrls: ['./create-permissao.component.css'],
})
export class CreatePermissaoComponent implements OnInit {
  tela!: Tela[];
  formulario!: any;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  id = this.activedRouter.snapshot.params['id'];


  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private roleTelaService: RoleTelaService,
    private telaService: TelaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    // let roleId = await this.token.getIdRole();

    await this.telaService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.tela = roleResponse;
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );

    await this.roleTelaService.getByRole(this.id).subscribe((res) => {
      var roleResponse = JSON.parse(JSON.stringify(res));
      roleResponse.forEach((element: any) => {

        this.createRoleExist(element);

        const selector = `[id='${element.idTela}']`;
        const inputElement = document.querySelector(selector);

        if (inputElement) {
          inputElement.setAttribute('checked', 'true');
        }
      });
    });

    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.array([]);
  }

  createInput(tela: Tela) {
    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.tela === tela.id
    );

    if (existingIndex !== -1) {
      this.formulario.controls[existingIndex].patchValue({ checked: !this.formulario.controls[existingIndex].value.checked });

      if (!this.formulario.controls[existingIndex].value.checked) {
        this.formulario.removeAt(existingIndex);
      }
    } else {
      const roleTelaGroup = this.formBuilder.group({
        role: this.id,
        tela: tela.id,
        checked: true,
      });

      this.formulario.push(roleTelaGroup);
    }
  }


  createRoleExist(element: any) {
    const roleTelaGroup = this.formBuilder.group({
      role: element.idRole,
      tela: element.idTela,
      checked: true,
    });

    this.formulario.push(roleTelaGroup);
  }

  save() {
    if (this.formulario.valid) {
      this.roleTelaService.create(this.formulario.value).subscribe(
        (data) => {
          this.notifier.showSuccess('Permissões cadastrada com sucesso!');
          this.router.navigateByUrl(`/role/telas/${this.id}`);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario);
    }
  }

  return() {
    this.router.navigateByUrl(`/role/telas/${this.id}`);
  }
}
