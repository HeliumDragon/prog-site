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
    this.userService.init();

    this.cards = [];

    this.search$
      .subscribe(forecast => this.getUser(forecast));

    this.getUser(this.userService.initialUser.login);
  }

  getUser(username: string, name?: string) {
    this.userService.getUser(username, name || '')
      .subscribe(results => this.cards.push(results));
  }

  constructor(@Inject('user') private userService) {}
}
