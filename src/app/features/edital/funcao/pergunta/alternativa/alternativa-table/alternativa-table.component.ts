import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Alternativa } from 'src/app/interfaces/dto/alternativa';
import { AlternativaInput } from 'src/app/interfaces/input/alternativaInput';
import { AlternativaService } from 'src/app/routes/alternativa.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-alternativa-table',
  templateUrl: './alternativa-table.component.html',
  styleUrls: ['./alternativa-table.component.css'],
})
export class AlternativaTableComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'alternativa',
    'pontuacao',
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
  idPergunta = this.activedRouter.snapshot.params['idPergunta'];

  alternativasArray = new MatTableDataSource<Alternativa>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alternativaService: AlternativaService,
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

    this.initTable();
  }

  ngAfterViewInit() {
    this.alternativasArray.paginator = this.paginator;
    this.alternativasArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.alternativasArray.filter = filterValue;
  }

  info(alternativa: Alternativa) {
    this.router.navigateByUrl(
      `alternativa/${this.idPergunta}/info/${alternativa.id}`
    );
  }

  ativar(alternativa: Alternativa) {
    let alternativaInput = new AlternativaInput(alternativa);

    this.alternativaService
      .ativar(alternativaInput, alternativa.id!)
      .subscribe((data) => {
        this.notifier.showSuccess('Alternativa ativado com sucesso!');
        window.location.reload();
      });

    window.location.reload();
  }

  openDialog(alternativa: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alternativaService.delete(alternativa.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Alternativa excluído com sucesso!');
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
    this.alternativaService
      .getAlternativaByPergunta(this.idPergunta)
      .subscribe((data) => {
        var alternativasResponse = JSON.parse(JSON.stringify(data));

        alternativasResponse.map((alternativa: Alternativa) => {
          if (alternativa.actived) {
            alternativa.actived = 'Ativo';
          } else {
            alternativa.actived = 'Desativado';
          }
        });
        this.alternativasArray.data = alternativasResponse;
        this.alternativasArray.filter = 'Ativo';
      });
  }

  getByInativo() {
    this.alternativasArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.alternativasArray.filter = 'Ativo';
  }
}
