import { Component, Input, OnInit } from '@angular/core';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css'],
})
export class NavbarLoginComponent implements OnInit {
  nameUser: any = '';

  @Input() value: String | undefined;
  ngOnInit(): void {
    this.nameUser = localStorage.getItem('user');
  }

  constructor(public styleService: StyleService) {}
}
