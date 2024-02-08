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
import { RoleService } from 'src/app/routes/role.service';
import { AlternativaService } from 'src/app/routes/alternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-create-alternativa',
  templateUrl: './create-alternativa.component.html',
  styleUrls: ['./create-alternativa.component.css']
})
export class CreateAlternativaComponent implements OnInit{
  alternativa!: Alternativa;
  roles?: Role[];
  formulario!: FormGroup;
  Sim = 'Sim';
  tipoPagina = 'CMS';
  Nao = 'Não';
  idPergunta = this.activedRouter.snapshot.params['idPergunta'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private alternativaService: AlternativaService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roles = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      alternativa: ['', [Validators.required, Validators.minLength(3)]],
      pontuacao: ['', [Validators.required]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let alternativaDTO = {
        alternativa: this.formulario.value.alternativa,
        pergunta: this.idPergunta,
        pontuacao: this.formulario.value.pontuacao,
      };

      let alternativaInput = new AlternativaInput(alternativaDTO);

      this.alternativaService.create(alternativaInput).subscribe(
        (data) => {
          this.notifier.showSuccess('Alternativa cadastrada com sucesso!');
          this.router.navigateByUrl(`/alternativa/${this.idPergunta}`);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario)
    }
  }

  return() {
    this.router.navigateByUrl(`/alternativa/${this.idPergunta}`);
  }

}
