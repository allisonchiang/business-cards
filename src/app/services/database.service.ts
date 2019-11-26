import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { Card } from '../models/card.model';

@Injectable()
export class DatabaseService {

    private cardDoc: AngularFirestoreDocument<Card>;
    cardsCollection: AngularFirestoreCollection<Card>;

    constructor(private db: AngularFirestore) { }

    createCard(card: Card) {
        console.log(card);
        console.log("Object in service: " + card.fname);
        // this.cardsCollection.add(card);
        this.db.collection('cards').add(card);
        console.log("Pushed card to database.")
    }

    readCard(id: string): Observable<Card> {
        this.cardDoc = this.db.doc<Card>(`cards/${id}`);
        return this.cardDoc.snapshotChanges()
            .pipe(
            map( changes => {
                const data = changes.payload.data();
                const id = changes.payload.id;
                return { id, ...data };
            }))
    }

    updateCard(id: string, card: Card) {
        this.db
        .collection('cards')
        .doc(id).update(card);
    }

    deleteCard(id: string) {
        console.log("Object in service: " + id);
        console.log("Deleted card from database.")
        this.db.collection('cards').doc(id).delete();
    }
}
