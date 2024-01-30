import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PerguntaWithAlternativa } from 'src/app/interfaces/dto/perguntaWithAlternativa';
import { InscricaoInput } from 'src/app/interfaces/input/inscricaoInput';
import { PerguntaRespostaInput } from 'src/app/interfaces/input/pergunta_respostaInput';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { LoginService } from 'src/app/routes/login.service';
import { PerguntaWithAlternativaService } from 'src/app/routes/perguntaWithAlternativa.service';
import { CookieService } from 'src/app/services/cookie.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

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
    private toast: NotifierService,
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
      var data = JSON.parse(JSON.stringify(res));
      this.user = data.id
    })

    await this.perguntaWithAlternativaService
      .getPerguntaWithAlternativa(this.idFuncao)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));

        this.list = response;

        this.form = this.fb.array([]);

        this.list.forEach((element) => {
          const prg = this.form as FormArray;
          prg.push(
            this.fb.group({
              idPergunta: [element.idPergunta],
              pergunta: [element.pergunta],
              alternativas: this.fb.array([]),
            })
          );
        });

        const prg = this.form as FormArray;
        prg.controls.forEach((element) => {
          const add = element.get('alternativas') as FormArray;
          const id = element.get('idPergunta') as FormArray;
          this.list.forEach((pergunta) => {
            pergunta.listAlternativas.forEach((alternativa) => {
              if (id.value === alternativa.idPergunta) {
                add.push(
                  this.fb.group({
                    idAlternativa: [alternativa.id],
                    alternativa: [alternativa.alternativa],
                    pontuacao: [alternativa.pontuacao],
                  })
                );
              }
            });
          });
        });
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

  setResposta(pergunta: number, alternativa: number | undefined, pontuacao :  number) {
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

  private setListInscricao(pergunta: number, alternativa: number | undefined, pontuacao: number) {
    this.listPerguntaResposta.push({
      pergunta: pergunta,
      alternativa: alternativa,
      pontuacao : pontuacao
    });
  }

  realizarInscricao() {
    let inscricaoInput = new InscricaoInput(
      this.listPerguntaResposta,
      this.idEdital,
      this.idFuncao,
      this.user
    );

    this.inscricaoService.create(inscricaoInput).subscribe((res) => {
      var response = JSON.parse(JSON.stringify(res));
      this.toast.showSuccess('Inscrição realizada com sucesso');
      this.router.navigate(['/edital/visualizareditais']);
    });
  }
}
