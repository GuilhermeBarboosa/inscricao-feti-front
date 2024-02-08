import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { RoleService } from 'src/app/routes/role.service';
import { FuncaoService } from 'src/app/routes/funcao.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-info-funcao',
  templateUrl: './info-funcao.component.html',
  styleUrls: ['./info-funcao.component.css']
})
export class InfoFuncaoComponent implements OnInit {
  formulario!: FormGroup;
  funcao?: Funcao;
  roles?: Role[];
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  idEdital = this.activedRouter.snapshot.params['idEdital'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';
  role = '';
  constructor(
    private activedRouter: ActivatedRoute,
    private funcaoService: FuncaoService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.funcaoService.getById(this.id).subscribe(
      (data) => {
        var funcaoResponse = JSON.parse(JSON.stringify(data));
        this.funcao = funcaoResponse;

        this.funcao!.created = this.utils.formatarData(this.funcao!.created);
        this.funcao!.updated = this.utils.formatarData(this.funcao!.updated);

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.funcao?.id, disabled: this.isDisabled }],
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
    this.router.navigateByUrl(`funcao/edit/${this.id}/${this.idEdital}`);
  }

  return() {
    this.router.navigateByUrl(`/funcao/${this.idEdital}`);
  }

  remove() {
    this.funcaoService.delete(this.id).subscribe(
      (data) => {
        this.notifier.showError('Funcao removido com sucesso!');
        this.router.navigateByUrl(`/funcao/${this.idEdital}`);
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }
}
