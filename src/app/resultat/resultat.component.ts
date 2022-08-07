import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HistoriqueService } from '../services/historique.service';
import { PassageToInsert } from '../models/historique';
import { Personne } from '../models/personne';
import { TestCovidService } from '../services/test-covid.service';
import { Test } from '../models/test';
import { VaccinService } from '../services/vaccin.service';
import { CarteVaccinService } from '../services/carte-vaccin.service';
import { CarteVaccination } from '../models/carte-vaccination';
import { Vaccin } from '../models/vaccin';
import { Platform } from '@ionic/angular';
import { LieuxService } from '../services/lieux.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss'],
})
export class ResultatComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;
  personneTag: any;
  personne: Personne;
  personneSub: any = {
    nom: 'ANDRIANJATOVONIAINA',
    prenom: 'Andy',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    date_naissance: '2000-07-12',
    adresse: 'Analamahitsy cité logt 427',
    cin: '054 057 287 2787',
    sexe: '1',
  };

  constructor(
    private router: Router,
    private tService: TestCovidService,
    private lService: LieuxService,
    private vService: VaccinService,
    private cvService: CarteVaccinService,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private hService: HistoriqueService,
    private platform: Platform
  ) {
    this.personneTag = {
      _id: '62e974b27187d900161e7cf7',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_personne: '',
      nom: 'ANDRIANJATOVONIAINA',
      prenom: 'Andy',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      date_naissance: new Date('2000-07-12'),
      adresse: 'Analamahitsy cité logt 427',
      cin: '054 057 287 2787',
      sexe: 1,
      mail: '',
    };
  }

  async ngOnInit() {
    const pers = await this.storage.get('json.personne');
    this.personne = pers;

    if (pers) {
      this.personneTag = pers;
    } else {
      this.personneTag = this.personneSub;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async redirect(chemin: string) {
    if (chemin == 'vaccin') {
      let carte: CarteVaccination = await this.storage.get('json.carte');
      if (carte) {
        this.router.navigateByUrl('/' + chemin);
      } else {
        this.cvService
          .getCarteByPersonne(this.personne._id)
          .subscribe(async (data: any) => {
            if (!data[0] || data[0] == null || data[0] == undefined) {
              alert("vous n'etes pas encore vacciné");
            } else {
              carte = data[0];
              await this.storage.set('json.carte', carte);
            }
          });
      }
    } else {
      this.router.navigateByUrl('/' + chemin);
    }
  }

  lieuID: String;

  scanLieu() {
    this.barcodeScanner
      .scan()
      .then(async (barcodeData) => {
        this.lieuID = barcodeData.text;

        this.lService.getLieu(this.lieuID).subscribe((data: any) => {
          if ( data == null ) {
            alert("ceci n'est pas un de nos lieux partenaires");
          }
          else {
            var Datenow = new Date();
            var passage: PassageToInsert = {
              lieu_id: this.lieuID,
              personne_id: this.personne._id,
              date_passage: Datenow,
            };
            this.hService.addPassage(passage).subscribe((data) => {});
            this.router.navigateByUrl('/lieu');
          }
        });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  scanTest() {
    this.barcodeScanner
      .scan()
      .then(async (barcodeData) => {
        var testID = barcodeData.text;
        this.tService.getTest(testID).subscribe((data: any) => {
          if (data == null) {
            alert("ceci n'est pas un test de la plateforme Novid");
          }
          else{
            var test: Test = data;
            if (test.personne_id != this.personne._id) {
              alert("ceci n'est pas un de vos tests");
            } else {
              this.router.navigate(['/test/details', testID]);
            }
          }
        
        });
      })
      .catch((err) => {
        alert("ceci n'est pas un de vos test");
      });
  }

  scanVaccin() {
    this.barcodeScanner
      .scan()
      .then(async (barcodeData) => {
        var vaccinID = barcodeData.text;
        let carte: CarteVaccination = await this.storage.get('json.carte');

          this.cvService.getCarte(vaccinID).subscribe(async (data: any) => {
            if (data == null)
            {
              this.vService.getVaccin(vaccinID).subscribe((data: any) => {
                if(data == null)
                {
                  alert("ceci n'est ni un vaccin ni une carte de vaccination de la plateforme Novid");
                } else {
                   var vaccin: Vaccin = data;
                  if (carte) {
                    if (vaccin.carte_id != carte._id) {
                      alert("ceci n'est pas un de vos vaccins");
                    } else {
                      this.router.navigateByUrl('/vaccin');
                    }
                  } else {
                    this.cvService
                      .getCarteByPersonne(this.personne._id)
                      .subscribe(async (data: any) => {
                        if (!data[0] || data[0] == null || data[0] == undefined) {
                          alert("ceci n'est pas un de vos vaccins");
                        } else {
                          carte = data[0];
                          await this.storage.set('json.carte', carte);
                          if (vaccin.carte_id != carte._id) {
                            alert("ceci n'est pas un de vos vaccins");
                          } else {
                            this.router.navigateByUrl('/vaccin');
                          }
                        }
                      });
                  }
                }
              });
            }
            else{
              var c :  CarteVaccination =  data;
              if(carte.id_carte != null){
                if(c._id != carte._id ){
                  alert("ceci n'est pas votre carte de vaccination");
                }
              }
              else{
                if(c.personne_id != this.personne._id ){
                  alert("ceci n'est pas votre carte de vaccination");
                }
                else{
                  await this.storage.set('json.carte', c);
                  this.router.navigateByUrl('/vaccin');
                }
              } 
            }
          });
        
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  logout() {
    console.log('deconnexion');
    this.storage.clear();
    this.router.navigateByUrl('/home');
  }
}
