import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { InscricaoInput } from 'src/app/interfaces/input/inscricaoInput';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    'status',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  role = '';

  inscricaoArray = new MatTableDataSource<Inscricao>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inscricaoService: InscricaoService,
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
    this.inscricaoArray.paginator = this.paginator;
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
