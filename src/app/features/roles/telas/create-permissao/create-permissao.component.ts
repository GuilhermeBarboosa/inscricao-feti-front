import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RoleTela } from '../../../../interfaces/dto/roleTela';
@Component({
  selector: 'app-create-permissao',
  templateUrl: './create-permissao.component.html',
  styleUrls: ['./create-permissao.component.css']
})
export class CreatePermissaoComponent implements OnInit{
  roleTela!: RoleTela[];
  formulario!: any;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  id = this.activedRouter.snapshot.params['id'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private roleTelaService: RoleTelaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.roleTelaService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roleTela = roleResponse;

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

  createInput(roleTela: RoleTela) {
    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.id === roleTela.id
    );

    if (existingIndex !== -1) {
      // Se o item já está no array, remove-o ao desmarcar
      this.formulario.removeAt(existingIndex);
    } else {
      // Se não está no array, adiciona
      const roleTelaGroup = this.formBuilder.group({
        id: roleTela.id,
        idRole: roleTela.idRole,
        idTela: roleTela.idTela,
      });

      this.formulario.push(roleTelaGroup);
    }
  }

  save() {
    console.log(this.formulario.value)
    // if (this.formulario.valid) {
    //   let funcaoDTO = {
    //     roleTela: this.formulario.value.roleTela,
    //     edital: this.id,
    //   };

    //   let funcaoInput = new FuncaoInput(funcaoDTO);

    //   this.funcaoService.create(funcaoInput).subscribe(
    //     (data) => {
    //       this.notifier.showSuccess('Função cadastrada com sucesso!');
    //       this.router.navigateByUrl(`/roleTela/${this.id}`);
    //     },
    //     (error) => {
    //       this.notifier.showError(error.error);
    //     }
    //   );
    // } else {
    //   this.utilsService.getFormValidationErrors(this.formulario);
    // }
  }

  return() {
    this.router.navigateByUrl(`/roleTela/${this.id}`);
  }
}
