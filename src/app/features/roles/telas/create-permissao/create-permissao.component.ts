import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Tela } from '../../../../interfaces/dto/tela';
import { RoleTelaInput } from 'src/app/interfaces/input/roleTelaInput';
import { TelaService } from 'src/app/routes/tela.service';
@Component({
  selector: 'app-create-permissao',
  templateUrl: './create-permissao.component.html',
  styleUrls: ['./create-permissao.component.css']
})
export class CreatePermissaoComponent implements OnInit{
  tela!: Tela[];
  formulario!: any;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  id = this.activedRouter.snapshot.params['id'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private roleTelaService: RoleTelaService,
    private telaService: TelaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.telaService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.tela = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  async createTable() {
    this.formulario = this.formBuilder.array([]);
  }

  createInput(tela: Tela) {
    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.id === tela.id
    );

    if (existingIndex !== -1) {
      // Se o item já está no array, remove-o ao desmarcar
      this.formulario.removeAt(existingIndex);
    } else {
      // Se não está no array, adiciona
      const roleTelaGroup = this.formBuilder.group({
        role: this.id,
        tela: tela.id,
      });

      this.formulario.push(roleTelaGroup);
    }
  }

  save() {
    // console.log(this.formulario.value)
    if (this.formulario.valid) {

      this.roleTelaService.create(this.formulario.value).subscribe(
        (data) => {
          this.notifier.showSuccess('Permissões cadastrada com sucesso!');
          this.router.navigateByUrl(`/role/telas/${this.id}`);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario);
    }
  }

  return() {
    this.router.navigateByUrl(`/role/telas/${this.id}`);
  }
}
