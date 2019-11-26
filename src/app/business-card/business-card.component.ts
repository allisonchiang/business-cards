import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  @Input() card: Card;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  deleteCard() {
    this.databaseService.deleteCard(this.card.id);
  }

}