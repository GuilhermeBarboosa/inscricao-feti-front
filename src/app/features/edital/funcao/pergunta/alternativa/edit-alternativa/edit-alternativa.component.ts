import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { Alternativa } from 'src/app/interfaces/dto/alternativa';
import { AlternativaInput } from 'src/app/interfaces/input/alternativaInput';
// import { EnderecoService } from 'src/app/routes/endereco.service';
import { RoleService } from 'src/app/routes/role.service';
import { AlternativaService } from 'src/app/routes/alternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-alternativa',
  templateUrl: './edit-alternativa.component.html',
  styleUrls: ['./edit-alternativa.component.css']
})
export class EditAlternativaComponent implements OnInit {
  formulario!: FormGroup;
  alternativa?: Alternativa;
  roles?: Role[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  idPergunta = this.activedRouter.snapshot.params['idPergunta'];
  Sim = 'Sim';
  Nao = 'Não';
  @ViewChild('inputCep') inputCep!: ElementRef;

  constructor(
    private activedRouter: ActivatedRoute,
    private alternativaService: AlternativaService,
    private roleService: RoleService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roles = roleResponse;
    });

    this.alternativaService.getById(this.id).subscribe((res) => {
      var alternativaResponse = JSON.parse(JSON.stringify(res));

      alternativaResponse.created = this.utils.formatarData(alternativaResponse.created);
      alternativaResponse.updated = this.utils.formatarData(alternativaResponse.updated);

      this.alternativa = alternativaResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.alternativa?.id, disabled: true }],
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
    if (this.formulario.valid) {
      let alternativaDTO = {
        alternativa: this.formulario.get('alternativa')?.value,
        pergunta: this.idPergunta,
        pontuacao: this.formulario.get('pontuacao')?.value,
      };

      let alternativaInput = new AlternativaInput(alternativaDTO);

      this.alternativaService.edit(alternativaInput, this.alternativa!.id!).subscribe(
        (data) => {
          this.notifier.showSuccess('Alternativa atualizado com sucesso!');
          this.router.navigateByUrl(`/alternativa/${this.idPergunta}`);
        },
        (error) => {
          this.notifier.showError(error.error);
          return;
        }
      );
    } else {
      this.notifier.showInfo('Preencha todos os campos!');
    }
  }

  return() {
    this.router.navigateByUrl(`/alternativa/${this.idPergunta}/info/${this.id}`);
  }
}
