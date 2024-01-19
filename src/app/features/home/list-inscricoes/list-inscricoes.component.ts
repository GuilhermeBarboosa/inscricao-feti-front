import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { PerguntaWithAlternativaService } from 'src/app/routes/perguntaWithAlternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-list-inscricoes',
  templateUrl: './list-inscricoes.component.html',
  styleUrls: ['./list-inscricoes.component.css'],
})
export class ListInscricoesComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private inscricaoService: InscricaoService,
    private login: LoginService,
    private router: Router,
    private toast: NotifierService
  ) {}

  user: number = 0;
  inscricao: Inscricao[] = [];

  async ngOnInit() {
    await this.login.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.user = data.id;

      this.inscricaoService.findByInscricaoList(this.user).subscribe((res) => {
        var data = JSON.parse(JSON.stringify(res));
        this.inscricao = data;

        console.log(this.inscricao);
      });
    });
  }

  infoInscrica(inscricao: Inscricao) {
    this.router.navigateByUrl(`/inscricao/info/${inscricao.id}`)
  }
}
