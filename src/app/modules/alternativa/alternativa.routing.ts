import { Routes } from '@angular/router';
import { AlternativaTableComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/alternativa-table/alternativa-table.component';
import { CreateAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/create-alternativa/create-alternativa.component';
import { EditAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/edit-alternativa/edit-alternativa.component';
import { InfoAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/info-alternativa/info-alternativa.component';

export const AlternativaRoutes: Routes = [
  {
    path: ':idPergunta',
    component: AlternativaTableComponent,
  },
  {
    path: ':idPergunta/register',
    component: CreateAlternativaComponent,
  },
  {
    path: ':idPergunta/edit/:id',
    component: EditAlternativaComponent,
  },
  {
    path: ':idPergunta/info/:id',
    component: InfoAlternativaComponent,
  }
];
