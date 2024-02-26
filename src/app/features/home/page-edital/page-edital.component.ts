import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Edital } from 'src/app/interfaces/dto/edital';
import { EditalService } from 'src/app/routes/edital.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-page-edital',
  templateUrl: './page-edital.component.html',
  styleUrls: ['./page-edital.component.css'],
})
export class PageEditalComponent implements OnInit {
  value?: String;
  dateResponseInicio?: Date;
  dateResponseFim?: Date;
  editalArray: Edital[] = [];
  idUser: number | undefined;

  constructor(
    private editalService: EditalService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  async ngOnInit() {
    let dateNow = new Date();

    this.editalService.getAll().subscribe((data) => {
      var editalsResponse = JSON.parse(JSON.stringify(data));

      editalsResponse = this.utilsService.ordenarAlfabetico(editalsResponse);

      editalsResponse.map((edital: Edital) => {
        this.dateResponseInicio = new Date(edital.data_fim);
        this.dateResponseFim = new Date(edital.data_inicio);

        if (
          edital.actived &&
          this.dateResponseInicio > dateNow &&
          this.dateResponseFim < dateNow
        ) {
          edital.data_inicio = this.utilsService.formatarData(
            this.convertDate(edital.data_inicio)
          );
          edital.data_fim = this.utilsService.formatarData(
            this.convertDate(edital.data_fim)
          );

          this.editalArray.push(edital);
        }
      });
    });
  }

  getFuncao(id: number | undefined) {
    this.router.navigateByUrl(`/inscricao/fazerinscricao/${id}`);
  }

  downloadEdital(id: number | undefined) {
    this.editalService.downloadEdital(id).subscribe((data) => {
      this.utilsService.saveArquivo(data);
    });
  }

  convertDate(date: String) {
    const dateString = date;
    const indexOfT = dateString.indexOf('T');
    return dateString.substring(0, indexOfT);
  }
}
