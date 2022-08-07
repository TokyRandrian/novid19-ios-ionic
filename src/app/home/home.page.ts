import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PersonneServiceService } from '../services/personne-service.service';
import { Personne } from '../models/personne';
import { CarteVaccinService } from '../services/carte-vaccin.service';
import { CarteVaccination } from '../models/carte-vaccination';
import { TestCovidService } from '../services/test-covid.service';
import { Test } from '../models/test';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  constructor(private router: Router,private tService: TestCovidService,private barcodeScanner: BarcodeScanner,private storage: Storage , private pService : PersonneServiceService, private cvService : CarteVaccinService) {}


  ngOnInit(){
   
    this.storage.get('json.personne').then(data=> { 
      if(data != null){
        this.router.navigateByUrl('/resultat');
      }
    });
   
 }

  pers: Personne;
  carte: CarteVaccination;
  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(async barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;

      this.tService.getTest(this.data.text).subscribe((data: any) => {
        if(data== null)
        {
            this.cvService.getCarte(this.data.text).subscribe(async (data: any) => {
              if (data == null)
              {
                alert("Veuillez sacnner un test ou une carte de vaccination");
              }
              else{
                this.carte =  data;
                await this.storage.set('json.carte', this.carte);

                this.pService.getPersonne(this.carte.personne_id).subscribe(async (data: any) => {
                this.pers= data;
                await this.storage.set('json.personne', this.pers);});

                this.router.navigateByUrl('/resultat');
              }
            });
            
        }
        else{
          var test: Test = data;
          this.pService.getPersonne(test.personne_id).subscribe(async (data: any) => {
            this.pers= data;
            await this.storage.set('json.personne', this.pers);
    
    
            this.cvService.getCarteByPersonne(test.personne_id).subscribe(async (data: any) => {
              if(data != null && data[0] != null){
                this.carte =  data[0];
                await this.storage.set('json.carte', this.carte);
              } 
            });
            this.router.navigateByUrl('/resultat');
          });
        }

      });

      
      
    }).catch(err => {
      console.log('Error', err);
    });
  }

  getPersonne(){

  }
}
