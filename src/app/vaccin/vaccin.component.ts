import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarteVaccination } from '../models/carte-vaccination';
import { Personne } from '../models/personne';
import { Vaccin } from '../models/vaccin';
import { CarteVaccinService } from '../services/carte-vaccin.service';
import { VaccinService } from '../services/vaccin.service';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-vaccin',
  templateUrl: './vaccin.component.html',
  styleUrls: ['./vaccin.component.scss'],
})
export class VaccinComponent implements OnInit, OnDestroy {
  constructor(
    private vService: VaccinService,
    private storage: Storage,
    private platform: Platform,
    private navController: NavController
  ) {}
  ngOnDestroy(): void {}

  pers: Personne;
  carteVaccin: CarteVaccination;
  vaccins: Vaccin[];
  async ngOnInit() {
    this.pers = await this.storage.get('json.personne');
    this.carteVaccin = await this.storage.get('json.carte');

    this.vService
      .getVaccinByCarte(this.carteVaccin._id)
      .subscribe((data: any) => {
        this.vaccins = data;
      });
  }

  logout() {
    console.log('deconnexion');
    this.storage.clear();
    // navigator['app'].exitApp();
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  back() {
    this.navController.back();
  }
}
