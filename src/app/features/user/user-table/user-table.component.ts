import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'status',
    'acoes',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';
  tipoPagina = 'CMS';
  role = '';

  usersArray = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
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
    this.usersArray.paginator = this.paginator;
    this.usersArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.usersArray.filter = filterValue;
  }

  info(user: User) {
    this.router.navigateByUrl(`user/info/${user.id}`);
  }

  ativar(user: User) {
    let userInput = new UserInput(user);

    this.userService.ativar(userInput, user.id!).subscribe((data) => {
      this.notifier.showSuccess('Usuário ativado com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(user: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(user.id).subscribe(
          (data) => {
            this.notifier.showSuccess('Usuário excluído com sucesso!');
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
    this.userService.getAll().subscribe((data) => {
      var usersResponse = JSON.parse(JSON.stringify(data));

      usersResponse.map((user: User) => {
        if (user.actived) {
          user.actived = 'Ativo';
        } else {
          user.actived = 'Desativado';
        }
      });
      this.usersArray.data = usersResponse;
      this.usersArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.usersArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.usersArray.filter = 'Ativo';
  }
}
