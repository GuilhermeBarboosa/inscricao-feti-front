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
import { Edital } from 'src/app/interfaces/dto/edital';
import { EditalInput } from 'src/app/interfaces/input/editalInput';
// import { EnderecoService } from 'src/app/routes/endereco.service';
import { RoleService } from 'src/app/routes/role.service';
import { EditalService } from 'src/app/routes/edital.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-edital',
  templateUrl: './edit-edital.component.html',
  styleUrls: ['./edit-edital.component.css'],
})
export class EditEditalComponent implements OnInit {
  formulario!: FormGroup;
  edital?: Edital;
  roles?: Role[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';
  @ViewChild('inputCep') inputCep!: ElementRef;

  constructor(
    private activedRouter: ActivatedRoute,
    private editalService: EditalService,
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

    this.editalService.getById(this.id).subscribe((res) => {
      var editalResponse = JSON.parse(JSON.stringify(res));

      editalResponse.data_inicio = this.utils.formatarData(
        editalResponse.data_inicio
      );
      editalResponse.data_fim = this.utils.formatarData(
        editalResponse.data_fim
      );
      editalResponse.created = this.utils.formatarData(editalResponse.created);
      editalResponse.updated = this.utils.formatarData(editalResponse.updated);

      this.edital = editalResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.edital?.id, disabled: true }],
      edital: [
        { value: this.edital?.edital, disabled: this.isDisabled },
        Validators.required,
      ],
      data_inicio: [
        { value: this.edital?.data_inicio, disabled: this.isDisabled },
        Validators.required,
      ],
      data_fim: [
        { value: this.edital?.data_fim, disabled: this.isDisabled },
        Validators.required,
      ],
      qtd_vagas: [
        { value: this.edital?.qtd_vagas, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.edital?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.edital?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let editalDTO = {
        edital: this.formulario.get('edital')?.value,
        data_inicio: this.formulario.get('data_inicio')?.value,
        data_fim: this.formulario.get('data_fim')?.value,
        qtd_vagas: this.formulario.get('qtd_vagas')?.value,
      };

      editalDTO.data_inicio = this.utils.formatarDataToSQL(
        editalDTO.data_inicio
      );
      editalDTO.data_fim = this.utils.formatarDataToSQL(
        editalDTO.data_fim
      );


      let editalInput = new EditalInput(editalDTO);

      console.log(editalInput)

      this.editalService.edit(editalInput, this.edital!.id!).subscribe(
        (data) => {
          this.notifier.showSuccess('Edital atualizado com sucesso!');
          this.router.navigateByUrl(`/edital`);
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
    this.router.navigateByUrl(`/edital/info/${this.edital?.id}`);
  }
}
