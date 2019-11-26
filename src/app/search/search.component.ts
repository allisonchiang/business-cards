import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Card } from '../models/card.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerms: string;
  private queryParamSub: any;
  private searchResultsSub: any;
  cards: Array<any>;
  isResultReady: boolean;

  constructor(private activeRoute: ActivatedRoute, private db: AngularFirestore) { 
    this.queryParamSub = this.activeRoute.params.subscribe(params => {
      
      if (params['terms']) { 
        this.searchTerms = params['terms'];
        this.search();
      }
    });
  }

  ngOnInit() {
  }

  search () {

    this.cards = [];

    let cardsFirstNameCollectionRef = this.db.collection<Card>("cards", ref => ref.where('fname', '==', this.searchTerms)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as Card;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      } )
    );

    this.searchResultsSub = cardsFirstNameCollectionRef.pipe().subscribe( result => {
      this.cards = this.cards.concat(result);
      this.isResultReady = true;
    });

  }

}
