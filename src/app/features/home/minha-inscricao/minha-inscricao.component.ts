import { Inscricao } from './../../../interfaces/dto/inscricao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { PerguntaWithAlternativaService } from 'src/app/routes/perguntaWithAlternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-minha-inscricao',
  templateUrl: './minha-inscricao.component.html',
  styleUrls: ['./minha-inscricao.component.css'],
})
export class MinhaInscricaoComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private inscricaoService: InscricaoService,
    private login: LoginService,
    private router: Router,
    private toast: NotifierService
  ) {}

  idUser = 0;
  id = this.activedRouter.snapshot.params['id'];
  inscricao!: Inscricao;

  async ngOnInit() {

    await this.login.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.idUser = data.id
    })



    this.inscricaoService
    .getInscricaoWithPerguntas(this.id)
    .subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.inscricao = data;

      if(this.inscricao.idUser != this.idUser){
        this.toast.showWarning('Você não tem permissão para acessar esta página')
        this.router.navigateByUrl('/inicio')
      }
    });
  }

}
