import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { LoginService } from 'src/app/routes/login.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Logout = 'Logout';
  nameUser: any = "";


  constructor(
    private router: Router,
    private notifier: NotifierService,
    private loginService: LoginService,
    private cookie: CookieService
  ) {}

  async ngOnInit() {
    this.nameUser = await this.cookie.getCookie('user');
  }

  logout() {
    this.loginService.logout();
  }
}
