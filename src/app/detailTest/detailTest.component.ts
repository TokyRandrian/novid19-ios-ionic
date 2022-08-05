import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Test } from '../models/test';
import { TestCovidService } from '../services/test-covid.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { Centre } from '../models/centre';
import { CentreService } from '../services/centre.service';

@Component({
  selector: 'app-detailTest',
  templateUrl: './detailTest.component.html',
  styleUrls: ['./detailTest.component.scss'],
})
export class DetailTestComponent implements OnInit, OnDestroy {
 
  constructor(private activatedRoute: ActivatedRoute, private cService : CentreService,private tService : TestCovidService,private storage: Storage) {}
  ngOnDestroy(): void {
    
  }

  test : Test;
  centre : Centre;
  async ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.tService.getTest(id).subscribe((data: any) => {
        this.test= data;
        this.cService.getCentre(id).subscribe((data: any) => {
          this.centre = data;
          
        });
      });
    });

    
  
  }
  
}
