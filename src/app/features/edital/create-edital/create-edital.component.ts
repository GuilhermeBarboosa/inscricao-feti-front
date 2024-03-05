import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Edital } from 'src/app/interfaces/dto/edital';
import { Role } from 'src/app/interfaces/dto/role';
import { EditalInput } from 'src/app/interfaces/input/editalInput';
import { EditalService } from 'src/app/routes/edital.service';
import { RoleService } from 'src/app/routes/role.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-edital',
  templateUrl: './create-edital.component.html',
  styleUrls: ['./create-edital.component.css'],
})
export class CreateEditalComponent implements OnInit {
  edital!: Edital;
  roles?: Role[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  @ViewChild('inputCep') inputCep!: ElementRef;
  @ViewChild('inputCpf') inputCpf!: ElementRef;

  constructor(
    private router: Router,
    private editalService: EditalService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (roleResponse) => {
        var roleJson = JSON.parse(JSON.stringify(roleResponse));
        this.roles = roleJson;

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      edital: ['', [Validators.required, Validators.minLength(3)]],
      data_inicio: ['', [Validators.required]],
      data_fim: ['', [Validators.required]],
      qtd_vagas: ['', Validators.required],
      arquivo: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    const selectedFile: File = <File>event.target.files[0];

    if (selectedFile) {
      const isPDF = selectedFile.name.toLowerCase().endsWith('.pdf');

      if (isPDF) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        this.formulario.get('arquivo')!.setValue(formData.get('file'));
      } else {
        this.notifier.showError('Arquivo inválido! Selecione um arquivo PDF.');
        this.formulario.get('arquivo')!.setValue(null);
      }
    }
  }

  save() {
    if (this.formulario.valid) {
      let editalDTO = {
        edital: this.formulario.value.edital,
        data_inicio: this.formulario.value.data_inicio,
        data_fim: this.formulario.value.data_fim,
        qtd_vagas: this.formulario.value.qtd_vagas,
        arquivo: this.formulario.get('arquivo')?.value,
      };

      editalDTO.data_inicio = this.utilsService.formatarDataToSQL(
        editalDTO.data_inicio
      );
      editalDTO.data_fim = this.utilsService.formatarDataToSQL(
        editalDTO.data_fim
      );

      let arquivo = this.formulario.value.arquivo;
      let editalInput = new EditalInput(editalDTO);

      this.editalService.create(editalInput).subscribe(
        (editalResponse) => {
          var editalJson = JSON.parse(JSON.stringify(editalResponse));

          this.editalService
            .uploadFile(this.formulario.get('arquivo')?.value, editalJson.id)
            .subscribe((response) => {
              this.notifier.showSuccess('Edital cadastrado com sucesso!');
              this.router.navigateByUrl('/edital');
            });
        },
        (error) => {
          this.notifier.showError(error.error.message);
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario);
    }
  }

  return() {
    this.router.navigateByUrl('/edital');
  }
}
