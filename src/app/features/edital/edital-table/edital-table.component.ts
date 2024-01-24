import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Edital } from 'src/app/interfaces/dto/edital';
import { EditalInput } from 'src/app/interfaces/input/editalInput';
import { EditalService } from 'src/app/routes/edital.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edital-table',
  templateUrl: './edital-table.component.html',
  styleUrls: ['./edital-table.component.css'],
})
export class EditalTableComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'edital',
    'funcao',
    'qtd_inicio',
    'qtd_fim',
    'status',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  role = '';

  editalArray = new MatTableDataSource<Edital>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private editalService: EditalService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private utils: UtilsService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();

    if (this.role != 'ADMIN') {
      const columnsToKeep: string[] = this.displayedColumns.filter(
        (column) => column !== 'excluir' && column !== 'status'
      );

      this.displayedColumns = [...columnsToKeep];
    }

    this.initTable();
  }

  ngAfterViewInit() {
    this.editalArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.editalArray.filter = filterValue;
  }

  info(edital: Edital) {
    this.router.navigateByUrl(`edital/info/${edital.id}`);
  }

  ativar(edital: Edital) {
    let editalInput = new EditalInput(edital);

    this.editalService.ativar(editalInput, edital.id!).subscribe((data) => {
      this.notifier.showSuccess('Edital ativado com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(edital: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editalService.delete(edital.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Edital excluído com sucesso!');
            window.location.reload();
          },
          (error) => {
            this.notifier.showError('Erro ao excluir usuário!');
          }
        );
      }
    });
  }

  initTable() {
    this.editalService.getAll().subscribe((data) => {
      var editalResponse = JSON.parse(JSON.stringify(data));

      editalResponse.map((edital: Edital) => {
        edital.data_inicio = this.utils.formatarData(edital.data_inicio);
        edital.data_fim = this.utils.formatarData(edital.data_fim);

        if (edital.actived) {
          edital.actived = 'Ativo';
        } else {
          edital.actived = 'Desativado';
        }
      });
      this.editalArray.data = editalResponse;
      this.editalArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.editalArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.editalArray.filter = 'Ativo';
  }

  getByFuncao(id: any) {
    this.router.navigateByUrl(`/funcao/${id}`)
  }
}
