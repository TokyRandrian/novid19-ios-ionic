import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personne } from '../models/personne';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private nService: NotificationService,
    private storage: Storage,
    private platform: Platform,
    private navController: NavController
  ) {}
  ngOnDestroy(): void {}

  notification: Message[];
  pers: Personne;

  async ngOnInit() {
    console.log("coucou");
    this.pers = await this.storage.get('json.personne');

    this.nService.getNotificationPersonne(this.pers._id).subscribe((data: any) => {
      this.notification = data;
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
