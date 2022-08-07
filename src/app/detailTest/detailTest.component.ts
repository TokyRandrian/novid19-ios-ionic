import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Test } from '../models/test';
import { TestCovidService } from '../services/test-covid.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Centre } from '../models/centre';
import { CentreService } from '../services/centre.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-detailTest',
  templateUrl: './detailTest.component.html',
  styleUrls: ['./detailTest.component.scss'],
})
export class DetailTestComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cService: CentreService,
    private tService: TestCovidService,
    private storage: Storage,
    private platform: Platform,
    private navController: NavController
  ) {}
  ngOnDestroy(): void {}

  test: Test;
  centre: Centre;
  async ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.tService.getTest(id).subscribe((data: any) => {
        this.test = data;
        this.cService.getCentre(this.test.centre_id).subscribe((data: any) => {
          this.centre = data;
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

  getEtatTest(etat: number) {
    switch (etat) {
      case 1:
        return 'Positif';
      case 2:
        return 'Negatif';
      default:
        return 'Inconnu';
    }
  }
}
