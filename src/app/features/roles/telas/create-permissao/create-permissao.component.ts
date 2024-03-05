import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';
import { Tela } from '../../../../interfaces/dto/tela';
import { PermissaoService } from 'src/app/routes/permissao.service';
import { Permissao } from 'src/app/interfaces/dto/permissao';
import { RoleTela } from 'src/app/interfaces/dto/roleTela';

@Component({
  selector: 'app-create-permissao',
  templateUrl: './create-permissao.component.html',
  styleUrls: ['./create-permissao.component.css'],
})
export class CreatePermissaoComponent implements OnInit {
  tela!: Tela[];
  permissao!: Permissao[];
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
    private permissaoService: PermissaoService,
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

    this.permissaoService.getAll().subscribe((res) => {
      var permissaoResponse = JSON.parse(JSON.stringify(res));
      this.permissao = permissaoResponse;
    });

    await this.roleTelaService.getByRole(this.id).subscribe((res) => {
      var roleResponse = JSON.parse(JSON.stringify(res));
      roleResponse.forEach((element: RoleTela) => {
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
    this.isCheckboxChecked(tela);

    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.tela === tela.id
    );

    if (existingIndex !== -1) {
      this.formulario.controls[existingIndex].patchValue({
        checked: !this.formulario.controls[existingIndex].value.checked,
      });

      if (!this.formulario.controls[existingIndex].value.checked) {
        this.formulario.removeAt(existingIndex);
      }
    } else {
      let permissao = 1

      const roleTelaGroup = this.formBuilder.group({
        role: this.id,
        tela: tela.id,
        checked: true,
        permissao: permissao,
      });

      this.formulario.push(roleTelaGroup);
    }
  }

  createPermission(tela: Tela, permissao: Permissao) {
    console.log(tela, permissao);
    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.tela === tela.id
    );

    this.formulario.controls[existingIndex].patchValue({
      permissao: permissao.id,
    });

    console.log(this.formulario.controls[existingIndex]);
    console.log(existingIndex);
  }

  isCheckboxChecked(t: any): boolean {
    const elements = document.querySelectorAll(
      `input[id^="permissao_${t.id}"]`
    );

    const labels = document.querySelectorAll(
      `label[id^="label_permissao_${t.id}"]`
    );

    elements.forEach((element) => {
      const inputElement = element as HTMLInputElement;
      if (inputElement) {
        inputElement.disabled = false;
      }
    });

    labels.forEach((element) => {
      const inputElement = element as HTMLLabelElement;
      if (inputElement) {
        inputElement.style.color = 'black';
      }
    });

    return true;
  }

  createRoleExist(element: RoleTela) {
    this.isCheckboxChecked(element.idTela);
    this.checkedInitCheckbox(element.idPermissao, element.idTela);
    const roleTelaGroup = this.formBuilder.group({
      role: element.idRole,
      tela: element.idTela,
      checked: true,
      permissao: element.idPermissao,
    });

    this.formulario.push(roleTelaGroup);

    console.log(this.formulario.controls);
  }

  checkedInitCheckbox(idPermissao: number, idTela: number) {
    const elements = document.querySelectorAll(
      `input[id="permissao_${idTela}"]`
    );

    const labels = document.querySelectorAll(
      `label[id="label_permissao_${idTela}"]`
    );

    elements.forEach((element) => {
      const inputElement = element as HTMLInputElement;

      if (inputElement) {
        inputElement.disabled = false;
      }

      if (inputElement.value == idPermissao.toString()) {
        inputElement.checked = true;
      }
    });

    labels.forEach((element) => {
      const inputElement = element as HTMLLabelElement;
      if (inputElement) {
        inputElement.style.color = 'black';
      }
    });
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
