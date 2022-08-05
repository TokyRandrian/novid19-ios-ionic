import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailTestComponent } from './detailTest/detailTest.component';
import { LieuComponent } from './lieu/lieu.component';
import { ResultatComponent } from './resultat/resultat.component';
import { TestComponent } from './test/test.component';
import { VaccinComponent } from './vaccin/vaccin.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'resultat',
    component: ResultatComponent,
  },
  {
    path: 'vaccin',
    component: VaccinComponent,
  },
  {
    path: 'lieu',
    component: LieuComponent,
  },
  {
    path: 'test/details/:id',
    component: DetailTestComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
