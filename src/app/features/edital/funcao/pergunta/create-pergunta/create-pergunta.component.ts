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
import { Pergunta } from 'src/app/interfaces/dto/pergunta';
import { PerguntaInput } from 'src/app/interfaces/input/perguntaInput';
import { RoleService } from 'src/app/routes/role.service';
import { PerguntaService } from 'src/app/routes/pergunta.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-pergunta',
  templateUrl: './create-pergunta.component.html',
  styleUrls: ['./create-pergunta.component.css']
})
export class CreatePerguntaComponent implements OnInit {
  pergunta!: Pergunta;
  roles?: Role[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private perguntaService: PerguntaService,
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
      pergunta: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let perguntaDTO = {
        pergunta: this.formulario.get('pergunta')?.value,
        funcao: this.idFuncao,
      };

      let perguntaInput = new PerguntaInput(perguntaDTO);

      console.log(perguntaInput);

      this.perguntaService.create(perguntaInput).subscribe(
        (data) => {
          this.notifier.showSuccess('Função cadastrada com sucesso!');
          this.router.navigateByUrl(`/pergunta/${this.idFuncao}`);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.notifier.showError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl(`/pergunta/`);
  }
}
