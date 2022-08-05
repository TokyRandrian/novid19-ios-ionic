import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Test } from '../models/test';
import { TestCovidService } from '../services/test-covid.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit, OnDestroy {
 
  constructor(private router: Router,private tService : TestCovidService,private storage: Storage) {}
  ngOnDestroy(): void {
    
  }

  tests : Test[] ;
  pers : Personne ;

  async ngOnInit() {
    
    this.pers = await this.storage.get('json.personne');
    this.tService.getTestPersonne(this.pers._id).subscribe((data: any) => {
        this.tests = data;
      });
  }

  resultatToString(etat:Number){
    switch (etat) {
      case 1:
        return 'Positif';
      case 2:
        return 'Negatif';
      default:
        return 'Inconnu';
    }
  }

  viewDetail(id: String){
    this.router.navigate(['/test/details', id]);
  }
  
}
