import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { FuncaoService } from 'src/app/routes/funcao.service';
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
  ) {}

  formulario!: FormGroup;
  idEdital = this.activedRouter.snapshot.params['idEdital'];
  funcoes: Funcao[] = [];

  async ngOnInit() {
    console.log(this.idEdital);
    await this.funcaoService.getByIdEdital(this.idEdital).subscribe((data) => {
      var funcaoResponse = JSON.parse(JSON.stringify(data));
      this.funcoes = funcaoResponse;
    });

    this.formulario = this.formBuilder.group({
      idFuncao: [{ value: 0 }, Validators.required],
    });
  }

  realizarInscricao() {
    let idFuncao = this.formulario.get('idFuncao')?.value;

    localStorage.setItem('funcao', idFuncao);
    localStorage.setItem('edital', this.idEdital);

    this.router.navigate([`/edital/perguntas/funcao/${idFuncao}`]);
  }
}
