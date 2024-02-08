import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Inscricao } from 'src/app/interfaces/dto/inscricao';
import { InscricaoInput } from 'src/app/interfaces/input/inscricaoInput';
import { InscricaoService } from 'src/app/routes/inscricao.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-all-inscricao',
  templateUrl: './info-all-inscricao.component.html',
  styleUrls: ['./info-all-inscricao.component.css']
})
export class InfoAllInscricaoComponent implements OnInit{
  value?: String;
  role = '';
  id = this.activedRouter.snapshot.params['id'];
  inscricao!: Inscricao;
  tipoPagina = 'CMS';

  constructor(
    private inscricaoService: InscricaoService,
    public dialog: MatDialog,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private utils: UtilsService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();

    await this.inscricaoService
      .getInscricaoWithPerguntas(this.id)
      .subscribe((data) => {
        var inscricaoResponse = JSON.parse(JSON.stringify(data));
        this.inscricao = inscricaoResponse;

      });


  }
}
