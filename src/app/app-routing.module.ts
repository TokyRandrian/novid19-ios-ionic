import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailTestComponent } from './detailTest/detailTest.component';
import { LieuComponent } from './lieu/lieu.component';
import { NotificationComponent } from './notification/notification.component';
import { ResultatComponent } from './resultat/resultat.component';
import { TestComponent } from './test/test.component';
import { VaccinComponent } from './vaccin/vaccin.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'resultat',
    component: ResultatComponent, //done
  },
  {
    path: 'vaccin',
    component: VaccinComponent, //done
  },
  {
    path: 'notification',
    component: NotificationComponent, //done
  },
  {
    path: 'lieu',
    component: LieuComponent, //done
  },
  {
    path: 'test/details/:id',
    component: DetailTestComponent, //done
  },
  {
    path: 'test',
    component: TestComponent, //done
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
