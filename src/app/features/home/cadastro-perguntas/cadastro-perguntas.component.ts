import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { perguntaWithAlternativa } from 'src/app/interfaces/dto/perguntaWithAlternativa';
import { PerguntaWithAlternativaService } from 'src/app/routes/perguntaWithAlternativa.service';

@Component({
  selector: 'app-cadastro-perguntas',
  templateUrl: './cadastro-perguntas.component.html',
  styleUrls: ['./cadastro-perguntas.component.css'],
})
export class CadastroPerguntasComponent implements OnInit {
  constructor(
    private activedRouter: ActivatedRoute,
    private perguntaWithAlternativaService: PerguntaWithAlternativaService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form!: any;
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];
  list: perguntaWithAlternativa[] = [];

  async ngOnInit() {
    console.log(this.idFuncao);
    await this.perguntaWithAlternativaService
      .getPerguntaWithAlternativa(this.idFuncao)
      .subscribe((data) => {
        console.log(data);
        var response = JSON.parse(JSON.stringify(data));

        this.list = response;
      });

      console.log("teste1")
    this.form = this.fb.group({
      pergunta: [],
      alternativas: this.fb.array([

      ]),
    });


    console.log("teste3")
    this.list.forEach((element) => {
      console.log(element)
      console.log("teste2")
      this.createArray();
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

  deleteAddressGroup(index: number) {
    const add = this.form.get('alternativas') as FormArray;
    add.removeAt(index);
  }
}
