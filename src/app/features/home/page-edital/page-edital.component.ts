import { Component, OnInit } from '@angular/core';
import { Edital } from 'src/app/interfaces/dto/edital';
import { EditalService } from 'src/app/routes/edital.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-page-edital',
  templateUrl: './page-edital.component.html',
  styleUrls: ['./page-edital.component.css']
})
export class PageEditalComponent implements OnInit{

  value?: String;
  dateResponseInicio?: Date;
  dateResponseFim?: Date;
  editalArray: Edital[] = [];

  constructor(
    private editalService: EditalService,
    private utilsService : UtilsService,
  ) {}

  async ngOnInit() {
    let dateNow = new Date();

    this.editalService.getAll().subscribe((data) => {
      var editalsResponse = JSON.parse(JSON.stringify(data));

      editalsResponse.map((edital: Edital) => {
        this.dateResponseInicio = new Date(edital.data_fim);
        this.dateResponseFim = new Date(edital.data_inicio);

        if (edital.actived && this.dateResponseInicio > dateNow && this.dateResponseFim < dateNow) {
          edital.data_inicio = this.utilsService.formatarData(this.convertDate(edital.data_inicio));
          edital.data_fim = this.utilsService.formatarData(this.convertDate(edital.data_fim));

          this.editalArray.push(edital);
        }

      });


    });
  }


  convertDate(date: String) {
    const dateString = date;
    const indexOfT = dateString.indexOf('T');
    return dateString.substring(0, indexOfT);
  }

}
