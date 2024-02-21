import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerguntaWithAlternativa } from 'src/app/interfaces/dto/perguntaWithAlternativa';
import { InscricaoInput } from 'src/app/interfaces/input/inscricaoInput';
import { PerguntaRespostaInput } from 'src/app/interfaces/input/pergunta_respostaInput';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { PerguntaWithAlternativaService } from 'src/app/routes/perguntaWithAlternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-cadastro-perguntas',
  templateUrl: './cadastro-perguntas.component.html',
  styleUrls: ['./cadastro-perguntas.component.css'],
})
export class CadastroPerguntasComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private perguntaWithAlternativaService: PerguntaWithAlternativaService,
    private login: LoginService,
    private router: Router,
    private cookie: CookieService,
    private fb: FormBuilder,
    private inscricaoService: InscricaoService
  ) {}

  form!: any;
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];
  idEdital = localStorage.getItem('edital') as unknown as number;
  user: number = 0;
  list: PerguntaWithAlternativa[] = [];
  listPerguntaResposta: PerguntaRespostaInput[] = [];

  async ngOnInit() {
    await this.login.obterClaims().subscribe((res) => {
      const data = JSON.parse(JSON.stringify(res));
      this.user = data.id;
    });

    await this.perguntaWithAlternativaService
      .getPerguntaWithAlternativa(this.idFuncao)
      .subscribe((data) => {
        const response = JSON.parse(JSON.stringify(data));
        this.list = response;
        this.initializeForm();
      });
  }

  initializeForm() {
    this.form = this.fb.array([]);

    this.list.forEach((element) => {
      const perguntaGroup = this.fb.group({
        idPergunta: [element.idPergunta],
        pergunta: [element.pergunta],
        alternativas: this.fb.array([]),
      });

      this.populateAlternativas(element, perguntaGroup);
      this.form.push(perguntaGroup);
    });
  }

  populateAlternativas(pergunta: any, perguntaGroup: any) {
    const alternativasArray = perguntaGroup.get('alternativas') as FormArray;

    pergunta.listAlternativas.forEach((alternativa: any) => {
      alternativasArray.push(
        this.fb.group({
          idAlternativa: [alternativa.id],
          alternativa: [alternativa.alternativa],
          pontuacao: [alternativa.pontuacao],
        })
      );
    });
  }

  createArray() {
    const add = this.form.get('alternativas') as FormArray;
    add.push(
      this.fb.group({
        idAlternativa: [],
        alternativa: [],
      })
    );
  }

  getPerguntaForm(index: number): FormGroup {
    const pergunta = this.list[index];

    return this.fb.group({
      idPergunta: [pergunta.idPergunta],
      pergunta: [pergunta.pergunta],
      alternativas: this.fb.array(
        pergunta.listAlternativas.map((alternativa) =>
          this.fb.group({
            idAlternativa: [alternativa.id],
            alternativa: [alternativa.alternativa],
            pontuacao: [alternativa.pontuacao],
          })
        )
      ),
    });
  }

  setResposta(
    pergunta: number,
    alternativa: number | undefined,
    pontuacao: number
  ) {
    if (this.listPerguntaResposta.length > 0) {
      let found = false;

      this.listPerguntaResposta.forEach((element) => {
        if (element.pergunta === pergunta) {
          element.alternativa = alternativa;
          found = true;
        }
      });

      if (!found) {
        this.setListInscricao(pergunta, alternativa, pontuacao);
      }
    } else {
      this.setListInscricao(pergunta, alternativa, pontuacao);
    }
  }

  private setListInscricao(
    pergunta: number,
    alternativa: number | undefined,
    pontuacao: number
  ) {
    this.listPerguntaResposta.push({
      pergunta: pergunta,
      alternativa: alternativa,
      pontuacao: pontuacao,
    });
  }

  realizarInscricao() {
    let inscricaoInput = new InscricaoInput(
      this.listPerguntaResposta,
      this.idEdital,
      this.idFuncao,
      this.user
    );

    localStorage.setItem('inscricao', JSON.stringify(inscricaoInput));

    this.router.navigate(['/inserirdoc']);
  }
}
