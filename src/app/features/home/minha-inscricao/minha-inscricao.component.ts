import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from 'src/app/interfaces/dto/arquivo';
import { ArquivoService } from 'src/app/routes/arquivo.service';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Inscricao } from './../../../interfaces/dto/inscricao';

@Component({
  selector: 'app-minha-inscricao',
  templateUrl: './minha-inscricao.component.html',
  styleUrls: ['./minha-inscricao.component.css'],
})
export class MinhaInscricaoComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private inscricaoService: InscricaoService,
    private arquivoService: ArquivoService,
    private login: LoginService,
    private utilsService: UtilsService,
    private router: Router,
    private toast: NotifierService
  ) {}

  idUser = 0;
  id = this.activedRouter.snapshot.params['id'];
  inscricao!: Inscricao;
  arquivo!: Arquivo[];

  async ngOnInit() {
    await this.login.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.idUser = data.id;
    });

    this.inscricaoService
      .getInscricaoWithPerguntas(this.id)
      .subscribe((res) => {
        var data = JSON.parse(JSON.stringify(res));
        this.inscricao = data;

        if (this.inscricao.idUser != this.idUser) {
          this.toast.showWarning(
            'Você não tem permissão para acessar esta página'
          );
          this.router.navigateByUrl('/inicio');
        }
      });

    this.arquivoService.getByInscricao(this.id).subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.arquivo = data;
    });
  }

  downloadDoc(arquivo: Arquivo) {
    this.arquivoService
      .getFile(arquivo.idInscricao, arquivo.caminho_arquivo)
      .subscribe((res) => {
        this.utilsService.saveArquivo(res);
      });
  }
}
