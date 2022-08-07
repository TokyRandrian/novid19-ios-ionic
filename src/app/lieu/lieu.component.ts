import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Storage } from '@ionic/storage-angular';
import { HistoriqueService } from '../services/historique.service';
import { Lieu } from '../models/lieux';
import { Historique, HistoriqueToDisp } from '../models/historique';
import { NavController, Platform } from '@ionic/angular';
import { LieuxService } from '../services/lieux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.scss'],
})
export class LieuComponent implements OnInit, OnDestroy {
  constructor(
    private hService: HistoriqueService,
    private storage: Storage,
    private router: Router,
    private platform: Platform,
    private navController: NavController,
    private lService: LieuxService
  ) {}
  ngOnDestroy(): void {}

  pers: Personne;
  lieu: Lieu[];
  passage: Historique[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  passageDisp: HistoriqueToDisp[] = [];

  async ngOnInit() {
    this.pers = await this.storage.get('json.personne');

    this.hService
      .getHistoriqueByPersonne(this.pers._id)
      .subscribe((data: any) => {
        this.passage = data;
        console.log(data);
        this.passage.forEach((element) => {
          this.lService.getLieu(element.lieu_id).subscribe((lieus: Lieu) => {
            const lieuDisp: HistoriqueToDisp = {
              // eslint-disable-next-line no-underscore-dangle
              _id: element._id,
              // eslint-disable-next-line @typescript-eslint/naming-convention
              date_passage: element.date_passage,
              lieu: lieus,
              // eslint-disable-next-line @typescript-eslint/naming-convention
              pesonne_id: element.personne_id,
            };
            this.passageDisp.push(lieuDisp);
          });
        });
      });
  }
  logout() {
    console.log('deconnexion');
    this.storage.clear();
    this.router.navigateByUrl('/home');
  }

  back() {
    this.router.navigateByUrl('/resultat');
  }
}
