import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';

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
