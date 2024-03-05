import { Funcao } from './../../../interfaces/dto/funcao';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogInscricaoComponent } from 'src/app/components/dialog-inscricao/dialog-inscricao.component';
import { ArquivoInput } from 'src/app/interfaces/input/arquivoInput';
import { ArquivoService } from 'src/app/routes/arquivo.service';
import { FuncaoService } from 'src/app/routes/funcao.service';
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
  pontuacao: number = 0;
  funcao!: Funcao;
  value?: String;
  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private inscricaoService: InscricaoService,
    private funcaoService: FuncaoService,
    private toast: NotifierService,
    private router: Router,
    public dialog: MatDialog,
    private arquivoService: ArquivoService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.array([]);

    await this.inscricaoService.inscricaoInput$.subscribe(async (data) => {
      this.inscricaoInput = data;

      await this.funcaoService
        .getById(this.inscricaoInput.funcao)
        .subscribe((dataFuncao) => {
          this.funcao = JSON.parse(JSON.stringify(dataFuncao));
        });

      await this.inscricaoInput.perguntaResposta.forEach((element: any) => {
        this.pontuacao += element.pontuacao;
      });
    });
  }

  createArquivo() {
    const arquivoGroup = this.formBuilder.group({
      nome_arquivo: [],
      arquivo: [],
    });

    this.form.push(arquivoGroup);
  }

  removeArquivo(index: number) {
    this.form.removeAt(index);
    this.listArquivos.splice(index, 1);
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
        const inputElement: HTMLInputElement = event.target;
        inputElement.value = '';
      }
    }
  }

  realizarInscricao() {
    if (this.listArquivos.length == 0) {
      this.notifier.showError('Selecione um arquivo para enviar');
      return;
    } else {
      let arquivoInput: ArquivoInput[] = [];

      let valid: Boolean = true;

      this.form.value.forEach((element: any) => {
        if (element.nome_arquivo == null || element.nome_arquivo == '') {
          this.notifier.showError('Informe o nome do arquivo');
          valid = false;
        } else {
          arquivoInput.push(new ArquivoInput(element));
        }
      });

      if (valid == true) {
        this.inscricaoService
          .create(this.inscricaoInput, arquivoInput)
          .subscribe(
            (dataInscricao) => {
              var responseInscricaoWithArquivos = JSON.parse(
                JSON.stringify(dataInscricao)
              );

              this.toast.showSuccess('Inscrição realizada com sucesso');

              this.arquivoService
                .uploadFile(
                  this.listArquivos,
                  responseInscricaoWithArquivos.arquivoInscricaoOutput,
                  responseInscricaoWithArquivos.inscricaoOutput.id
                )
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
      }
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogInscricaoComponent, {
      width: '400px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.realizarInscricao();
      }
    });
  }
}
