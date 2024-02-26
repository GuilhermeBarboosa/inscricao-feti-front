import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { Situacao } from 'src/app/interfaces/dto/situacao';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { SituacaoService } from 'src/app/routes/situacao.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-inscricao',
  templateUrl: './edit-inscricao.component.html',
  styleUrls: ['./edit-inscricao.component.css'],
})
export class EditInscricaoComponent {
  value?: String;
  formulario!: FormGroup;
  situacaoArray!: Situacao[];
  role = '';
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';

  id = this.activedRouter.snapshot.params['id'];
  inscricao!: Inscricao;

  constructor(
    private inscricaoService: InscricaoService,
    public dialog: MatDialog,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private situacaoService: SituacaoService,
    private token: TokenJwtService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();

    await this.situacaoService.getAll().subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      this.situacaoArray = response;
    });

    await this.inscricaoService
      .getInscricaoWithPerguntas(this.id)
      .subscribe((data) => {
        var inscricaoResponse = JSON.parse(JSON.stringify(data));
        this.inscricao = inscricaoResponse;
        this.createTable();
      });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.inscricao?.id, disabled: true }],
      name: [
        { value: this.inscricao?.user, disabled: true },
        Validators.required,
      ],
      situacao: [
        { value: this.inscricao?.idSituacao, disabled: false },
        Validators.required,
      ],
      cpf: [
        { value: this.inscricao?.cpf, disabled: true },
        Validators.required,
      ],
      pontuacao: [
        { value: this.inscricao?.pontuacao, disabled: false },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let inscricaoDTO = {
        pontuacao: this.formulario.get('pontuacao')?.value,
        situacao: this.formulario.get('situacao')?.value,
      };

      this.inscricaoService
        .editPontuacao(inscricaoDTO, this.inscricao!.id!)
        .subscribe(
          (data) => {
            this.notifier.showSuccess('inscricao atualizado com sucesso!');
            this.router.navigateByUrl(`/inscricao`);
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
    this.router.navigateByUrl(`/inscricao`);
  }
}
