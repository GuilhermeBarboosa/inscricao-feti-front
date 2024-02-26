import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from 'src/app/interfaces/dto/arquivo';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { ArquivoService } from 'src/app/routes/arquivo.service';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-all-inscricao',
  templateUrl: './info-all-inscricao.component.html',
  styleUrls: ['./info-all-inscricao.component.css'],
})
export class InfoAllInscricaoComponent implements OnInit {
  value?: String;
  role = '';
  id = this.activedRouter.snapshot.params['id'];
  inscricao!: Inscricao;
  tipoPagina = 'CMS';
  arquivo!: Arquivo[];

  constructor(
    private inscricaoService: InscricaoService,
    public dialog: MatDialog,
    private activedRouter: ActivatedRoute,
    private token: TokenJwtService,
    private utilsService: UtilsService,
    private arquivoService: ArquivoService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();

    await this.inscricaoService
      .getInscricaoWithPerguntas(this.id)
      .subscribe((data) => {
        var inscricaoResponse = JSON.parse(JSON.stringify(data));
        this.inscricao = inscricaoResponse;
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
