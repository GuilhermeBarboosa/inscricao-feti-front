import { Routes } from '@angular/router';
import { PrivacidadeComponent } from 'src/app/features/politica/privacidade/privacidade.component';
import { TermosDeUsoComponent } from 'src/app/features/politica/termos-de-uso/termos-de-uso.component';

export const PoliticaRoutes: Routes = [
  {
    path: 'privacidade',
    component: PrivacidadeComponent,
  },
  {
    path: 'termos_uso',
    component: TermosDeUsoComponent,
  }
];
