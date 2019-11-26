import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  card: Card;
  editBusinessCardForm: FormGroup;
  editedCard: Card;
  cardId: string;
  private paramSub: any;
  private cardSub: any;

  constructor(private databaseService: DatabaseService, private route: Router, fb: FormBuilder, private activeRoute: ActivatedRoute) {
    this.editBusinessCardForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'company': [''],
      'email': [''],
      'phone': ['']
    });
   }

  ngOnInit() {
    this.paramSub = this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.cardId = params['id'];
      this.cardSub = this.databaseService.readCard( this.cardId ).subscribe( result => {

        this.card = result;
        // this.imageDataUrl = this.card.imageBase64;

        // if ( this.imageDataUrl.length ) {
        //   this.showWebcam = false;
        // }

        console.log(result);

        this.editBusinessCardForm.patchValue({
          firstName: this.card.fname,
          lastName: this.card.lname,
          company: this.card.company,
          email: this.card.email,
          phone: this.card.phone
        });

      });

    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.cardSub.unsubscribe();
  }

  onSubmit(value: any): void {
    this.editedCard = {
      fname: value.firstName,
      lname: value.lastName,
      company: value.company,
      email: value.email,
      phone: value.phone
    }

    this.databaseService.updateCard(this.cardId, this.editedCard);
    this.route.navigate(['dashboard']);
    // this.route.navigate([`dashboard/card-details/${this.cardId}`]);
  }
}