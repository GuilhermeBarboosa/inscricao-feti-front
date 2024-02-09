import { Component, OnInit } from '@angular/core';
import { Chart, plugins, registerables } from 'chart.js';
import { Edital } from 'src/app/interfaces/dto/edital';
import { DashboardService } from 'src/app/routes/dashboard.service';
import { EditalService } from 'src/app/routes/edital.service';
import { UtilsService } from 'src/app/services/utils.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tipoPagina = 'CMS';

  inscricaoChart: any = [];
  usersChart: any = [];
  qtdFuncaoByEdital: any = [];
  getInfo: any;

  editalArray!: Edital[];
  constructor(
    private dashboard: DashboardService,
    private utils: UtilsService,
    private editalService: EditalService
  ) {}

  ngOnInit() {
    this.dashboard.getAll().subscribe((response) => {
      var json = JSON.parse(JSON.stringify(response));

      this.generatePieInscricao(json.quantidadeInscricaoOutput);
      this.generateLineUsers(json.quantidadeUserByMesOutput);
      this.getInfo = json.quantidadeAllOutput
    });

    this.editalService.getAll().subscribe((data) =>{
      this.editalArray = JSON.parse(JSON.stringify(data));

      console.log(this.editalArray)
    })
  }

  private generatePieInscricao(json: any) {
    let labels: any = [];
    let qtdEdital: any = [];
    let colors: any = [];

    json.forEach((element: any) => {
      labels.push(element.edital);
      qtdEdital.push(element.qtdEdital);
      colors.push(this.utils.generateColors());
    });

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade',
          data: qtdEdital,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };

    this.inscricaoChart = new Chart('inscricaoChart', {
      type: 'pie',
      data: data,
      options: {
        responsive: true,  // Tornar o gráfico responsivo
        maintainAspectRatio: false,  // Não manter a proporção de aspecto
        plugins: {
          title: {
            display: true,
            text: 'Qtd inscrito por edital',
          },
          legend: {
            display: true,
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }

  private generateLineUsers(json: any) {
    let labels: any = [];
    let qtdUser: any = [];
    let colors: any = [];

    json.forEach((element: any) => {
      labels.push(element.data);
      qtdUser.push(element.qtdUser);
      colors.push(this.utils.generateColors());
    });

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Usuários',
          data: qtdUser,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };

    this.usersChart = new Chart('userChart', {
      type: 'line',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Qtd de usuarios',
          },
          legend: {
            display: true,

            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });
  }

  private generatePieFuncaoByEdital(json: any) {
    let labels: any = [];
    let qtdInscritos: any = [];
    let colors: any = [];

    json.forEach((element: any) => {
      labels.push(element.funcao);
      qtdInscritos.push(element.qtdInscritos);
      colors.push(this.utils.generateColors());
    });

    if (this.qtdFuncaoByEdital && this.qtdFuncaoByEdital.length !== 0) {
      this.qtdFuncaoByEdital.destroy();
      this.qtdFuncaoByEdital = null;
    }

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade',
          data: qtdInscritos,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };

    this.qtdFuncaoByEdital = new Chart('qtdFuncaoByEdital', {
      type: 'pie',
      data: data,
      options: {
        responsive: true,  // Tornar o gráfico responsivo
        maintainAspectRatio: false,  // Não manter a proporção de aspecto
        plugins: {
          title: {
            display: true,
            text: `Qtd inscrito no edital`,
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }


  getInfoByEdital(id: any){
    this.dashboard.getQtdFuncaoByEdital(id).subscribe((data) => {
      var json = JSON.parse(JSON.stringify(data));
      this.generatePieFuncaoByEdital(json)
    })
  };
}
