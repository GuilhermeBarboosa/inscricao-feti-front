import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Edital } from 'src/app/interfaces/dto/edital';
import { EditalInput } from 'src/app/interfaces/input/editalInput';
import { EditalService } from 'src/app/routes/edital.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';
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
  tipoPagina = 'CMS';
  role = '';

  telasDefault: any = null;
  rolesDefault = roles;
  permissions: any = [];

  editalArray = new MatTableDataSource<Edital>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private editalService: EditalService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private utilsService: UtilsService,
    private telaService: TelaService,
    public permissionService: PermissionsGuardService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();

    this.telasDefault = this.telaService.telasAll;

    if (this.role == this.rolesDefault.ROLE_ADMIN) {
        this.permissions = this.telaService.telaAdmin
    } else {
      this.permissionService.permissionsVariables$.subscribe((res) => {
        this.permissions = res;
      });
    }

    this.permissionService.verifyPermissions();

    this.initTable();
  }

  ngAfterViewInit() {
    this.editalArray.paginator = this.paginator;
    this.editalArray.sort = this.sort;
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

  announceSortChange(sort: Sort) {
    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  initTable() {
    this.editalService.getAll().subscribe((data) => {
      var editalResponse = JSON.parse(JSON.stringify(data));

      editalResponse.map((edital: Edital) => {
        edital.data_inicio = this.utilsService.formatarData(edital.data_inicio);
        edital.data_fim = this.utilsService.formatarData(edital.data_fim);

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

  downloadEdital(id: number | undefined) {
    this.editalService.downloadEdital(id).subscribe((data) => {
      this.utilsService.saveArquivo(data);
    });
  }

  getByInativo() {
    this.editalArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.editalArray.filter = 'Ativo';
  }

  getByFuncao(id: any) {
    this.router.navigateByUrl(`/funcao/${id}`);
  }
}
