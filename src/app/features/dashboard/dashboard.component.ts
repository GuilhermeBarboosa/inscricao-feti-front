import { Component, OnInit } from '@angular/core';
import { Chart, plugins, registerables } from 'chart.js';
import { DashboardService } from 'src/app/routes/dashboard.service';
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
  getInfo: any;
  constructor(
    private dashboard: DashboardService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.dashboard.getAll().subscribe((response) => {
      var json = JSON.parse(JSON.stringify(response));

      this.generatePieInscricao(json.quantidadeInscricaoOutput);
      this.generateLineUsers(json.quantidadeUserByMesOutput);
      this.getInfo = json.quantidadeAllOutput
    });
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
      type: 'doughnut',
      data: data,
      options: {
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
}
