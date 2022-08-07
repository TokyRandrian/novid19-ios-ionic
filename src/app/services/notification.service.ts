import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlNode } from 'src/environments/environment';
import { Lieu, LieuToInsert } from '../models/lieux';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  configUrl = apiUrlNode;

  constructor(private http: HttpClient) {}

  getNotification() {
    return this.http.get<Lieu[]>(this.configUrl + 'message');
  }

  getNotificationPersonne(id: String) {
    return this.http.get<Lieu>(this.configUrl + 'messagePersonne/' + id);
  }

}
