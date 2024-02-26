import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pergunta } from 'src/app/interfaces/dto/pergunta';
import { Role } from 'src/app/interfaces/dto/role';
import { PerguntaService } from 'src/app/routes/pergunta.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-pergunta',
  templateUrl: './info-pergunta.component.html',
  styleUrls: ['./info-pergunta.component.css'],
})
export class InfoPerguntaComponent implements OnInit {
  formulario!: FormGroup;
  pergunta?: Pergunta;
  roles?: Role[];
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';
  role = '';
  constructor(
    private activedRouter: ActivatedRoute,
    private perguntaService: PerguntaService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.perguntaService.getById(this.id).subscribe(
      (data) => {
        var perguntaResponse = JSON.parse(JSON.stringify(data));
        this.pergunta = perguntaResponse;

        this.pergunta!.created = this.utilsService.formatarData(
          this.pergunta!.created
        );
        this.pergunta!.updated = this.utilsService.formatarData(
          this.pergunta!.updated
        );

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.pergunta?.id, disabled: this.isDisabled }],
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
    this.router.navigateByUrl(`pergunta/${this.idFuncao}/edit/${this.id}`);
  }

  return() {
    this.router.navigateByUrl(`/pergunta/${this.idFuncao}`);
  }

  remove() {
    this.perguntaService.delete(this.id).subscribe(
      (data) => {
        this.notifier.showError('Pergunta removido com sucesso!');
        this.router.navigateByUrl(`/pergunta/${this.idFuncao}`);
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }
}
