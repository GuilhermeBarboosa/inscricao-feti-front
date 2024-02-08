import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-inscricoes',
  templateUrl: './list-inscricoes.component.html',
  styleUrls: ['./list-inscricoes.component.css'],
})
export class ListInscricoesComponent implements OnInit {
  constructor(
    private inscricaoService: InscricaoService,
    private login: LoginService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  user: number = 0;
  length = 0;
  inscricao: Inscricao[] = [];

  async ngOnInit() {
    await this.login.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.user = data.id;

      this.inscricaoService.findByInscricaoList(this.user).subscribe((res) => {
        var data = JSON.parse(JSON.stringify(res));
        this.inscricao = data;

        if (this.inscricao.length != 0) {
          this.length = this.inscricao.length;
        }
        this.inscricao.forEach((element) => {
          element.created = this.utilsService.formatarData(element.created);
        });
      });
    });
  }

  infoInscrica(inscricao: Inscricao) {
    this.router.navigateByUrl(`/inscricao/info/${inscricao.id}`);
  }
}
