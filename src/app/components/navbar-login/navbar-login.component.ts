import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css'],
})
export class NavbarLoginComponent implements OnInit {

  nameUser = localStorage.getItem("user")
  @Input() value: String | undefined;
  ngOnInit(): void {
  }

  constructor(public styleService: StyleService) {}
}
