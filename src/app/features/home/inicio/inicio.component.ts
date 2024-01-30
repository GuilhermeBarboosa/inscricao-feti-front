import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/routes/login.service';
import { CookieService } from 'src/app/services/cookie.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private token: TokenJwtService, private router: Router) {}

  ngOnInit() {}

  getMinhasInscricoes() {
    this.router.navigateByUrl(`/minha-inscricao`);
  }
}
