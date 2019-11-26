import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DatabaseService } from './database.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/catch';


@Injectable()
export class TextService {
  url: string;
  businesscard: Card;

  constructor(private http: HttpClient, private databaseService: DatabaseService) {
      this.url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.googleApi.key}`;
      // this.businesscard = new Card();
  }

  detectTextNow(apiResultText: any) {
    if (apiResultText != null) {
      // const resultText: string = apiResultText.responses[0].fullTextAnnotation.text;
      // const resultTextArray: Array<string> = resultText.split("\n");

    var fname, lname, fullname, company, email, phone;

    this.http.post(this.url, apiResultText)
      .pluck('responses', '0', 'textAnnotations')
      .subscribe(
        (value: [any]) => {
          value.forEach(
            result => {
              const line = result.description;
              console.log(line);

              // verify name
              if ( line.match(/\w+\s((\w{1}\.|\w{1})\s)?(\w*\-)?\w+/i) ) {
                const newLine = line.split("\n")[0];
                fullname = newLine.split(' ');
                fname = fullname[0];
                lname = fullname[1];
                company = line.split("\n")[1];
                console.log('newLine', newLine);
                console.log(fullname, fname, lname)
                return;
              }

              // verify company
              // if ( line.match(/\w+\s((\w{1}\.|\w{1})\s)?(\w*\-)?\w+/i) ) {
              //   const newLine = line.split("\n")[0];
              //   company = newLine;
              //   console.log('newLine', newLine);
              //   console.log('company', company);
              //   return;
              // }

              // verify email
              if ( line.match(/@/) ) {
              // if ( line.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i) ) {
                email = line;
                console.log(email);
                return;
              }

              // verify phone
              if ( line.match(/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/) ) {
                phone = line;
                console.log(phone);
                return;
              }
            }
          );

          this.businesscard = {
            fname: fname,
            lname: lname,
            company: company,
            email: email,
            phone: phone
          }
          console.log(this.businesscard);
          this.databaseService.createCard(this.businesscard);
        }
      );
    }
  }
}