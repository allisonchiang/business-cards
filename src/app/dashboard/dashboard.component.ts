import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Card } from '../models/card.model';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cardsArray: Observable<any[]>;
  newCard: Card;

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  ngOnInit() {
    let cardsCollection = this.db.collection<Card>('cards');
    this.cardsArray = cardsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Card;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  textDetection() {
    const request: any = {
      'requests': [
      {
      'image': {
       'source': {
      'imageUri': 'https://i.imgur.com/GKy9VF4.jpg',
      },
      },
      'features': [
      {
      'type': 'TEXT_DETECTION',
      'maxResults': 1,
      }
      ]
      }
      ]
      };
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.googleApi.key}`;
      this.http.post(
      url,
      request
      ).subscribe( (results: any) => {
      console.log('RESULTS RESULTS RESULTS');
      console.log(results);
      console.log('RESULTS RESULTS RESULTS');
      });
  }
}
