import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Pergunta } from 'src/app/interfaces/dto/pergunta';
import { PerguntaInput } from 'src/app/interfaces/input/perguntaInput';
import { PerguntaService } from 'src/app/routes/pergunta.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-pergunta-table',
  templateUrl: './pergunta-table.component.html',
  styleUrls: ['./pergunta-table.component.css'],
})
export class PerguntaTableComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'pergunta',
    'alternativas',
    'status',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  tipoPagina = 'CMS';
  Info = 'Info';
  role = '';
  idFuncao = this.activedRouter.snapshot.params['idFuncao'];
  id = this.activedRouter.snapshot.params['id'];

  perguntasArray = new MatTableDataSource<Pergunta>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private perguntaService: PerguntaService,
    private activedRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private _liveAnnouncer: LiveAnnouncer
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
    this.perguntasArray.paginator = this.paginator;
    this.perguntasArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.perguntasArray.filter = filterValue;
  }

  info(pergunta: Pergunta) {
    this.router.navigateByUrl(`pergunta/${this.idFuncao}/info/${pergunta.id}`);
  }

  ativar(pergunta: Pergunta) {
    let perguntaInput = new PerguntaInput(pergunta);

    this.perguntaService
      .ativar(perguntaInput, pergunta.id!)
      .subscribe((data) => {
        this.notifier.showSuccess('Pergunta ativado com sucesso!');
        window.location.reload();
      });

    window.location.reload();
  }

  openDialog(pergunta: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.perguntaService.delete(pergunta.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Pergunta excluído com sucesso!');
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
    this.perguntaService
      .getIdPerguntaByFuncao(this.idFuncao)
      .subscribe((data) => {
        var perguntasResponse = JSON.parse(JSON.stringify(data));

        perguntasResponse.map((pergunta: Pergunta) => {
          if (pergunta.actived) {
            pergunta.actived = 'Ativo';
          } else {
            pergunta.actived = 'Desativado';
          }
        });
        this.perguntasArray.data = perguntasResponse;
        this.perguntasArray.filter = 'Ativo';
      });
  }

  getByInativo() {
    this.perguntasArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.perguntasArray.filter = 'Ativo';
  }

  getAlternativaByPergunta(id: any) {
    this.router.navigateByUrl(`/alternativa/${id}`);
  }
}
