import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Role } from 'src/app/interfaces/dto/role';
import { RoleTela } from 'src/app/interfaces/dto/roleTela';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { RoleService } from 'src/app/routes/role.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-table-telas',
  templateUrl: './table-telas.component.html',
  styleUrls: ['./table-telas.component.css']
})
export class TableTelasComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  role_admin = roles.ROLE_ADMIN
  displayedColumns: string[] = [
    'id',
    // 'tela',
    'descricao',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  tipoPagina = 'CMS';
  roleToken = '';
  id = this.activedRouter.snapshot.params['id'];


  roleTelaArray = new MatTableDataSource<RoleTela>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleTelaService: RoleTelaService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private utilsService: UtilsService,
    private activedRouter: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  async ngOnInit() {
    this.roleToken = await this.token.getRole();

    if (this.roleToken != 'ADMIN') {
      const columnsToKeep: string[] = this.displayedColumns.filter(
        (column) => column !== 'excluir' && column !== 'status'
      );

      this.displayedColumns = [...columnsToKeep];
    }

    this.initTable();
  }

  ngAfterViewInit() {
    this.roleTelaArray.paginator = this.paginator;
    this.roleTelaArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.roleTelaArray.filter = filterValue;
  }

  info(role: Role) {
    this.router.navigateByUrl(`role/info/${role.id}`);
  }


  openDialog(role: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleTelaService.delete(role.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Permissão excluída com sucesso!');
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
    this.roleTelaService.getByRole(this.id).subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roleTelaArray.data = roleResponse;
    });
  }


  getByInativo() {
    this.roleTelaArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.roleTelaArray.filter = 'Ativo';
  }

  getByTelas(id: any) {
    this.router.navigateByUrl(`role/telas/${id}`);
  }
}
