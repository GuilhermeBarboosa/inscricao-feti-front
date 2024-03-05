import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { InscricaoInput } from 'src/app/interfaces/input/inscricaoInput';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-inscricao-table',
  templateUrl: './inscricao-table.component.html',
  styleUrls: ['./inscricao-table.component.css'],
})
export class InscricaoTableComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'usuario',
    'edital',
    'funcao',
    'pontuacao',
    'situacao',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  tipoPagina = 'CMS';
  role = '';

  telasDefault: any = null;
  rolesDefault = roles;
  permissions: any = [];

  inscricaoArray = new MatTableDataSource<Inscricao>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inscricaoService: InscricaoService,
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

    this.initTable();
  }

  ngAfterViewInit() {
    this.inscricaoArray.paginator = this.paginator;
    this.inscricaoArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.inscricaoArray.filter = filterValue;
  }

  info(inscricao: Inscricao) {
    this.router.navigateByUrl(`inscricao/infoAll/${inscricao.id}`);
  }

  edit(inscricao: Inscricao) {
    this.router.navigateByUrl(`inscricao/edit/${inscricao.id}`);
  }

  ativar(inscricao: Inscricao) {
    let inscricaoInput = new InscricaoInput(
      [],
      inscricao.idEdital,
      inscricao.idFuncao,
      inscricao.idUser
    );

    this.inscricaoService
      .ativar(inscricaoInput, inscricao.id!)
      .subscribe((data) => {
        this.notifier.showSuccess('Inscricao ativado com sucesso!');
        window.location.reload();
      });

    window.location.reload();
  }

  openDialog(inscricao: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inscricaoService.delete(inscricao.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Inscricao excluído com sucesso!');
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
    this.inscricaoService.getAll().subscribe((data) => {
      var inscricaoResponse = JSON.parse(JSON.stringify(data));

      inscricaoResponse.map((inscricao: Inscricao) => {
        if (inscricao.actived) {
          inscricao.actived = 'Ativo';
        } else {
          inscricao.actived = 'Desativado';
        }
      });
      this.inscricaoArray.data = inscricaoResponse;
      this.inscricaoArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.inscricaoArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.inscricaoArray.filter = 'Ativo';
  }
}
