import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DialogComponent)private dialog: DialogComponent;
  cards: Array<string>;
  search$ = new Subject<string>();


  ngOnInit() {
    let key, label;
    this.userService.init();

    this.cards = [];

    this.search$
      .subscribe(forecast => this.getCity(forecast));

    this.getCity(this.userService.initialUser._id);
  }

  getCity(key: string, name?: string) {
    this.userService.getForecast(key, name || '')
      .subscribe(results => this.cards.push(results));
  }

  constructor(@Inject('user') private userService) {}
}
