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
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { FuncaoInput } from 'src/app/interfaces/input/funcaoInput';
import { RoleService } from 'src/app/routes/role.service';
import { FuncaoService } from 'src/app/routes/funcao.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-funcao',
  templateUrl: './create-funcao.component.html',
  styleUrls: ['./create-funcao.component.css'],
})
export class CreateFuncaoComponent implements OnInit {
  funcao!: Funcao;
  roles?: Role[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  id = this.activedRouter.snapshot.params['id'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private funcaoService: FuncaoService,
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
      funcao: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let funcaoDTO = {
        funcao: this.formulario.value.funcao,
        edital: this.id,
      };

      let funcaoInput = new FuncaoInput(funcaoDTO);

      this.funcaoService.create(funcaoInput).subscribe(
        (data) => {
          this.notifier.showSuccess('Função cadastrada com sucesso!');
          this.router.navigateByUrl(`/funcao/${this.id}`);
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
    this.router.navigateByUrl(`/funcao/${this.id}`);
  }
}
