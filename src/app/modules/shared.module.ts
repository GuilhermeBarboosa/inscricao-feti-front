import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ButtonGreenComponent } from '../components/button-green/button-green.component';
import { ButtonRedComponent } from '../components/button-red/button-red.component';
import { ButtonYellowComponent } from '../components/button-yellow/button-yellow.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarLoginComponent } from '../components/navbar-login/navbar-login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MatSortModule } from '@angular/material/sort';
import { DialogInscricaoComponent } from '../components/dialog-inscricao/dialog-inscricao.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule,
    MatSortModule,
  ],
  exports: [
    SidebarComponent,
    DialogComponent,
    NavbarComponent,
    DialogInscricaoComponent,
    FooterComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
    NavbarLoginComponent,
    ReactiveFormsModule,
    RouterModule,
    MatSortModule,
  ],
  declarations:[
    SidebarComponent,
    DialogComponent,
    NavbarComponent,
    DialogInscricaoComponent,
    FooterComponent,
    ButtonGreenComponent,
    NavbarLoginComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
  ]
})
export class SharedModule {}
