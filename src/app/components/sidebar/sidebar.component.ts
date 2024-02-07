import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from '../../services/token-jwt.service';
import { CookieService } from 'src/app/services/cookie.service';
import { LoginService } from 'src/app/routes/login.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  role = '';
  isSidebarOpen: boolean = false;
  sideListOriginal: any;
  constructor(
    public styleService: StyleService,
    private token: TokenJwtService,
    private loginService: LoginService,
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
  }

  openMenu() {
    let sidebar = document.querySelector('.sidebar');
    let closeBtn = document.querySelector('#btn');
    let searchBtn = document.querySelector('.bx-search');
    sidebar!.classList.toggle('open');
    this.menuBtnChange(sidebar, closeBtn);
  }

  menuBtnChange(
    sidebar: Element | null | undefined,
    closeBtn: Element | null | undefined
  ) {
    if (sidebar!.classList.contains('open')) {
      closeBtn!.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      closeBtn!.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    let sideList = document.querySelector('#nav-list');

    var lis = sideList?.querySelectorAll('li');
    for (var i = 0; i < lis!.length; i++) {
      var name = lis![i].innerText.toLowerCase();
      if (name.includes(filterValue)) lis![i].style.display = 'list-item';
      else lis![i].style.display = 'none';
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  async logout() {
    this.loginService.logout();
  }
}
