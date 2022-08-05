import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Storage } from '@ionic/storage-angular';
import { HistoriqueService } from '../services/historique.service';
import { Lieu } from '../models/lieux';
import { Historique } from '../models/historique';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.scss'],
})
export class LieuComponent implements OnInit, OnDestroy {
 
  constructor(private hService : HistoriqueService,private storage: Storage) {}
  ngOnDestroy(): void {
    
  }

  pers: Personne;
  lieu: Lieu[];
  passage: Historique[];
  

  async ngOnInit() {
    this.pers = await this.storage.get('json.personne');
    this.hService.getHistoriqueByPersonne(this.pers._id).subscribe((data: any) => {
        this.passage = data;
      });
    }

}
