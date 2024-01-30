import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Alternativa } from 'src/app/interfaces/dto/alternativa';
import { AlternativaInput } from 'src/app/interfaces/input/alternativaInput';
import { AlternativaService } from 'src/app/routes/alternativa.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

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
  role = '';
  idPergunta = this.activedRouter.snapshot.params['idPergunta'];

  alternativasArray = new MatTableDataSource<Alternativa>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alternativaService: AlternativaService,
    private activedRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService
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
    this.alternativasArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.alternativasArray.filter = filterValue;
  }

  info(alternativa: Alternativa) {
    this.router.navigateByUrl(`alternativa/${this.idPergunta}/info/${alternativa.id}`);
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
