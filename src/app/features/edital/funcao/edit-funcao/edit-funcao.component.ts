import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { Role } from 'src/app/interfaces/dto/role';
import { FuncaoInput } from 'src/app/interfaces/input/funcaoInput';
import { FuncaoService } from 'src/app/routes/funcao.service';
import { RoleService } from 'src/app/routes/role.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-funcao',
  templateUrl: './edit-funcao.component.html',
  styleUrls: ['./edit-funcao.component.css'],
})
export class EditFuncaoComponent implements OnInit {
  formulario!: FormGroup;
  funcao?: Funcao;
  roles?: Role[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  idEdital = this.activedRouter.snapshot.params['idEdital'];
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  @ViewChild('inputCep') inputCep!: ElementRef;

  constructor(
    private activedRouter: ActivatedRoute,
    private funcaoService: FuncaoService,
    private roleService: RoleService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roles = roleResponse;
    });

    this.funcaoService.getById(this.id).subscribe((res) => {
      var funcaoResponse = JSON.parse(JSON.stringify(res));

      funcaoResponse.created = this.utilsService.formatarData(
        funcaoResponse.created
      );
      funcaoResponse.updated = this.utilsService.formatarData(
        funcaoResponse.updated
      );

      this.funcao = funcaoResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.funcao?.id, disabled: true }],
      funcao: [
        { value: this.funcao?.funcao, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.funcao?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.funcao?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let funcaoDTO = {
        funcao: this.formulario.get('funcao')?.value,
        edital: this.idEdital,
      };

      let funcaoInput = new FuncaoInput(funcaoDTO);

      this.funcaoService.edit(funcaoInput, this.funcao!.id!).subscribe(
        (data) => {
          this.notifier.showSuccess('Funcao atualizado com sucesso!');
          this.router.navigateByUrl(`/funcao/${this.idEdital}`);
        },
        (error) => {
          this.notifier.showError(error.error);
          return;
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario);
    }
  }

  return() {
    this.router.navigateByUrl(
      `/funcao/info/${this.funcao?.id}/${this.idEdital}`
    );
  }
}
