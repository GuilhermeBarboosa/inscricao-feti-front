import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  getMinhasInscricoes() {
    this.router.navigateByUrl(`/minha-inscricao`);
  }
}
