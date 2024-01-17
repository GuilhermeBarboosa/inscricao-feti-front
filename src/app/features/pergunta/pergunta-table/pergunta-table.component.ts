import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Pergunta } from 'src/app/interfaces/dto/pergunta';
import { PerguntaInput } from 'src/app/interfaces/input/perguntaInput';
import { PerguntaService } from 'src/app/routes/pergunta.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-pergunta-table',
  templateUrl: './pergunta-table.component.html',
  styleUrls: ['./pergunta-table.component.css']
})
export class PerguntaTableComponent implements OnInit {

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'pergunta',
    'alternativas',
    'arquivos',
    // 'status',
    // 'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  role = '';

  perguntasArray = new MatTableDataSource<Pergunta>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private perguntaService: PerguntaService,
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
    this.perguntasArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.perguntasArray.filter = filterValue;
  }

  info(pergunta: Pergunta) {
    this.router.navigateByUrl(`pergunta/info/${pergunta.id}`);
  }

  ativar(pergunta: Pergunta) {
    let perguntaInput = new PerguntaInput(pergunta);

    this.perguntaService.ativar(perguntaInput, pergunta.id!).subscribe((data) => {
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

  initTable() {
    this.perguntaService.getAll().subscribe((data) => {
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
}
