import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarteVaccination } from '../models/carte-vaccination';
import { Personne } from '../models/personne';
import { Vaccin } from '../models/vaccin';
import { CarteVaccinService } from '../services/carte-vaccin.service';
import { VaccinService } from '../services/vaccin.service';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccin',
  templateUrl: './vaccin.component.html',
  styleUrls: ['./vaccin.component.scss'],
})
export class VaccinComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
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
    this.router.navigateByUrl('/home');
  }

  back() {
    this.router.navigateByUrl('/resultat');
  }
}
