import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Logout = 'Logout';
  nameUser: any = '';
  role = '';

  constructor(private loginService: LoginService) {}

  async ngOnInit() {
    this.nameUser = localStorage.getItem('user');
  }

  async logout() {
    this.loginService.logout();
  }
}
