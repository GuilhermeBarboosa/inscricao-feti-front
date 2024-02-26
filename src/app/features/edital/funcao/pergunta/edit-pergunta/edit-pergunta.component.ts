import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pergunta } from 'src/app/interfaces/dto/pergunta';
import { Role } from 'src/app/interfaces/dto/role';
import { PerguntaInput } from 'src/app/interfaces/input/perguntaInput';
import { PerguntaService } from 'src/app/routes/pergunta.service';
import { RoleService } from 'src/app/routes/role.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-pergunta',
  templateUrl: './edit-pergunta.component.html',
  styleUrls: ['./edit-pergunta.component.css'],
})
export class EditPerguntaComponent implements OnInit {
  formulario!: FormGroup;
  pergunta?: Pergunta;
  roles?: Role[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  @ViewChild('inputCep') inputCep!: ElementRef;

  constructor(
    private activedRouter: ActivatedRoute,
    private perguntaService: PerguntaService,
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

    this.perguntaService.getById(this.id).subscribe((res) => {
      var perguntaResponse = JSON.parse(JSON.stringify(res));

      perguntaResponse.created = this.utilsService.formatarData(
        perguntaResponse.created
      );
      perguntaResponse.updated = this.utilsService.formatarData(
        perguntaResponse.updated
      );

      this.pergunta = perguntaResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.pergunta?.id, disabled: true }],
      pergunta: [
        { value: this.pergunta?.pergunta, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.pergunta?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.pergunta?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let perguntaDTO = {
        pergunta: this.formulario.get('pergunta')?.value,
        funcao: this.idFuncao,
      };

      let perguntaInput = new PerguntaInput(perguntaDTO);

      this.perguntaService.edit(perguntaInput, this.pergunta!.id!).subscribe(
        (data) => {
          this.notifier.showSuccess('Pergunta atualizado com sucesso!');
          this.router.navigateByUrl(`/pergunta/${this.idFuncao}`);
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
      `/pergunta/${this.idFuncao}/info/${this.pergunta?.id}`
    );
  }
}
