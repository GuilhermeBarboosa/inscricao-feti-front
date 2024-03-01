import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { Role } from 'src/app/interfaces/dto/role';
import { RoleInput } from 'src/app/interfaces/input/roleInput';
import { RoleService } from 'src/app/routes/role.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
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
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      role: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let roleDTO = {
        role: this.formulario.value.role,
      };

      let roleInput = new RoleInput(roleDTO);

      this.roleService.create(roleInput).subscribe(
        (data) => {
          this.notifier.showSuccess('Permissão cadastrada com sucesso!');
          this.router.navigateByUrl(`/role`);
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
    this.router.navigateByUrl(`/role`);
  }
}
