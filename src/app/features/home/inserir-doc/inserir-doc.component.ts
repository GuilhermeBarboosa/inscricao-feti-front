import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArquivoInput } from 'src/app/interfaces/input/arquivoInput';
import { ArquivoService } from 'src/app/routes/arquivo.service';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-inserir-doc',
  templateUrl: './inserir-doc.component.html',
  styleUrls: ['./inserir-doc.component.css'],
})
export class InserirDocComponent implements OnInit {
  form!: any;
  inscricaoInput: any;
  listArquivos: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private inscricaoService: InscricaoService,
    private toast: NotifierService,
    private router: Router,
    private arquivoService: ArquivoService // private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.inscricaoInput = localStorage.getItem('inscricao');

    this.form = this.formBuilder.array([]);
  }

  createArquivo() {
    console.log('Arquivo criado');

    const arquivoGroup = this.formBuilder.group({
      nome_arquivo: [],
      arquivo: [],
    });

    this.form.push(arquivoGroup);
  }

  removeArquivo(index: number) {
    this.form.removeAt(index);
  }

  onFileSelected(index: number, event: any) {
    const selectedFile: File = <File>event.target.files[0];

    if (selectedFile) {
      const isPDF = selectedFile.name.toLowerCase().endsWith('.pdf');

      if (isPDF) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        this.form.value[index].arquivo = formData.get('file');
        this.listArquivos.push(selectedFile);
      } else {
        this.notifier.showError('Arquivo inválido! Selecione um arquivo PDF.');
        this.form.value[index].arquivo = null;
      }
    }
  }

  realizarInscricao() {
   if(this.listArquivos.length == 0){
     this.notifier.showError('Selecione um arquivo para enviar');
     return;
   }else{
    this.inscricaoService.create(this.inscricaoInput).subscribe(
      (dataInscricao) => {
        var responseInscricao = JSON.parse(JSON.stringify(dataInscricao));
        let idInscricao = responseInscricao.id;

        this.toast.showSuccess('Inscrição realizada com sucesso');

        let arquivoInput: ArquivoInput[] = [];
        this.form.value.forEach((element: any) => {
          arquivoInput.push(new ArquivoInput(element, idInscricao));
        });

        this.arquivoService.create(arquivoInput).subscribe(
          (dataArquivo) => {
            var responseArquivo = JSON.parse(JSON.stringify(dataArquivo));

            this.arquivoService
              .uploadFile(this.listArquivos, responseArquivo, idInscricao)
              .subscribe(
                (data) => {
                  this.toast.showSuccess('Arquivo enviado com sucesso');
                  this.router.navigateByUrl('/minha-inscricao');
                },
                (error) => {
                  this.toast.showError('Erro ao realizar inscrição');
                }
              );
          },
          (error) => {
            this.toast.showError('Erro ao realizar inscrição');
          }
        );
      },
      (error) => {
        this.toast.showError('Erro ao realizar inscrição');
      }
    );
   }
  }
}
