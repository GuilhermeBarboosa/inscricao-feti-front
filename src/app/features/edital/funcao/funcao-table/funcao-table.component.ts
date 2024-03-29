import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Funcao } from 'src/app/interfaces/dto/funcao';
import { FuncaoInput } from 'src/app/interfaces/input/funcaoInput';
import { FuncaoService } from 'src/app/routes/funcao.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-funcao-table',
  templateUrl: './funcao-table.component.html',
  styleUrls: ['./funcao-table.component.css'],
})
export class FuncaoTableComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'funcao', 'perguntas', 'status', 'acoes'];
  Adicionar = 'Adicionar';
  Info = 'Info';
  role = '';
  tipoPagina = 'CMS';
  idEdital = this.activedRouter.snapshot.params['id'];

  funcaoArray = new MatTableDataSource<Funcao>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  telasDefault: any = null;
  rolesDefault = roles;
  permissions: any = [];

  constructor(
    private funcaoService: FuncaoService,
    private activedRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService,
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
    this.funcaoArray.paginator = this.paginator;
    this.funcaoArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.funcaoArray.filter = filterValue;
  }

  info(funcao: Funcao) {
    this.router.navigateByUrl(`funcao/info/${funcao.id}/${this.idEdital}`);
  }

  ativar(funcao: Funcao) {
    let funcaoInput = new FuncaoInput(funcao);

    this.funcaoService.ativar(funcaoInput, funcao.id!).subscribe((data) => {
      this.notifier.showSuccess('Funcao ativado com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(funcao: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.funcaoService.delete(funcao.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Funcao excluído com sucesso!');
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
    this.funcaoService.getByIdEdital(this.idEdital).subscribe((data) => {
      var funcaoResponse = JSON.parse(JSON.stringify(data));

      funcaoResponse.map((funcao: Funcao) => {
        if (funcao.actived) {
          funcao.actived = 'Ativo';
        } else {
          funcao.actived = 'Desativado';
        }
      });
      this.funcaoArray.data = funcaoResponse;
      this.funcaoArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.funcaoArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.funcaoArray.filter = 'Ativo';
  }

  getByPerguntas(id: any) {
    this.router.navigateByUrl(`/pergunta/${id}`);
  }
}
