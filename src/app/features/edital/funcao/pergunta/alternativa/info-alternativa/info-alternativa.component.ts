import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { Alternativa } from 'src/app/interfaces/dto/alternativa';
import { RoleService } from 'src/app/routes/role.service';
import { AlternativaService } from 'src/app/routes/alternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-info-alternativa',
  templateUrl: './info-alternativa.component.html',
  styleUrls: ['./info-alternativa.component.css']
})
export class InfoAlternativaComponent  implements OnInit {
  formulario!: FormGroup;
  alternativa?: Alternativa;
  roles?: Role[];
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  idPergunta = this.activedRouter.snapshot.params['idPergunta'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';
  role = '';
  constructor(
    private activedRouter: ActivatedRoute,
    private alternativaService: AlternativaService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.alternativaService.getById(this.id).subscribe(
      (data) => {
        var alternativaResponse = JSON.parse(JSON.stringify(data));
        this.alternativa = alternativaResponse;

        this.alternativa!.created = this.utilsService.formatarData(this.alternativa!.created);
        this.alternativa!.updated = this.utilsService.formatarData(this.alternativa!.updated);

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.alternativa?.id, disabled: this.isDisabled }],
      alternativa: [
        { value: this.alternativa?.alternativa, disabled: this.isDisabled },
        Validators.required,
      ],
      pontuacao: [
        { value: this.alternativa?.pontuacao, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.alternativa?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.alternativa?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`alternativa/${this.idPergunta}/edit/${this.id}`);
  }

  return() {
    this.router.navigateByUrl(`/alternativa/${this.idPergunta}`);
  }

  remove() {
    this.alternativaService.delete(this.id).subscribe(
      (data) => {
        this.notifier.showError('Alternativa removido com sucesso!');
        this.router.navigateByUrl(`/alternativa/${this.idPergunta}`);
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }
}
