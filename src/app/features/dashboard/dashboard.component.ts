import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
    this.dashboard.getAll().subscribe((dashboardResponse) => {
      var dashboardJson = JSON.parse(JSON.stringify(dashboardResponse));

      this.generatePieInscricao(dashboardJson.quantidadeInscricaoOutput);
      this.generateLineUsers(dashboardJson.quantidadeUserByMesOutput);
      this.getInfo = dashboardJson.quantidadeAllOutput;
    });

    this.editalService.getAll().subscribe((editalResponse) => {
      this.editalArray = JSON.parse(JSON.stringify(editalResponse));
    });
  }

  private generatePieInscricao(dashboardJson: any) {
    let labels: any = [];
    let qtdEdital: any = [];
    let colors: any = [];

    dashboardJson.forEach((dashboard: any) => {
      labels.push(dashboard.edital);
      qtdEdital.push(dashboard.qtdEdital);
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Quantidade inscrito por edital',
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

  private generateLineUsers(user: any) {
    let labels: any = [];
    let qtdUser: any = [];
    let colors: any = [];

    user.forEach((user: any) => {
      labels.push(user.data);
      qtdUser.push(user.qtdUser);
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
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          decimation: {
            enabled: false,
          },
          title: {
            display: true,
            text: 'Quantidade de usuarios',
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });
  }

  private generatePieFuncaoByEdital(funcaoByEdital: any) {
    let labels: any = [];
    let qtdInscritos: any = [];
    let colors: any = [];

    funcaoByEdital.forEach((funcaoByEdital: any) => {
      labels.push(funcaoByEdital.funcao);
      qtdInscritos.push(funcaoByEdital.qtdInscritos);
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Quantidade de inscrito no edital`,
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

  getInfoByEdital(idEdital: any) {
    this.dashboard.getQtdFuncaoByEdital(idEdital).subscribe((data) => {
      var json = JSON.parse(JSON.stringify(data));
      this.generatePieFuncaoByEdital(json);
    });
  }
}
