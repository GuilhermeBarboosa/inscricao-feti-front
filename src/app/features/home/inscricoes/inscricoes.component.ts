import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { VerifyInput } from 'src/app/interfaces/input/verifyInput';
import { FuncaoService } from 'src/app/routes/funcao.service';
import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrls: ['./inscricoes.component.css'],
})
export class InscricoesComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private funcaoService: FuncaoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: NotifierService,
    private login: LoginService
  ) {}

  formulario!: FormGroup;
  idEdital = this.activedRouter.snapshot.params['idEdital'];
  funcoes: Funcao[] = [];
  user: number = 0;

  async ngOnInit() {
    await this.funcaoService.getByIdEdital(this.idEdital).subscribe((data) => {
      var funcaoResponse = JSON.parse(JSON.stringify(data));
      this.funcoes = funcaoResponse;
    });

    await this.login.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.user = data.id
    })

    this.formulario = this.formBuilder.group({
      idFuncao: [{ value: 0 }, Validators.required],
    });
  }

  async realizarInscricao() {

    let idFuncao = this.formulario.get('idFuncao')?.value;

    localStorage.setItem('funcao', idFuncao);
    localStorage.setItem('edital', this.idEdital);

    let verifyInput = new VerifyInput(this.idEdital, idFuncao, this.user)

    await this.funcaoService.getVerifyInscricao(verifyInput).subscribe(
      (data) => {
        try {
          const parsedData = JSON.parse(JSON.stringify(data));
          this.toast.showSuccess(parsedData.message);
          this.router.navigate([`/edital/perguntas/funcao/${idFuncao}`]);
        } catch (e) {
          console.error(e);
        }
      },
      (error) =>{
        this.toast.showError("Você já possui uma inscrição para este cargo");
      }
    );



  }
}
