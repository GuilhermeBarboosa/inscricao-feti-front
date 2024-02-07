import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css'],
})
export class NavbarLoginComponent implements OnInit {
  @Input() value: String | undefined;

   bg_primary_color = localStorage.getItem('bg-primary-color');
   bg_secundary_color = localStorage.getItem('bg-secundary-color');

  ngOnInit(): void {


  }

  constructor(private cookieService: CookieService) {}
}
