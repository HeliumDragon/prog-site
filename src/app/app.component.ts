import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DialogComponent } from './dialog/dialog.component';

import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DialogComponent)private dialog: DialogComponent;

  cards: Array<User>;

  search$ = new Subject<string>();

  ngOnInit() {
    this.userService.init();

    this.cards = [];

    this.search$
      .subscribe(forecast => this.getUser(forecast));

    this.getUser(this.userService.initialUser.login);
  }

  onAddUser(user) {
    this.getUser(user);
  }

  getUser(username: string): Array<User> {
    return this.userService.getUser(username)
      .subscribe(results => {
        let uniqUsers = this.cards.every(item => {
          return item.id !== results.id;
        });

        if (uniqUsers)
          return this.cards.push(results);
      });
  }

  constructor(@Inject('user') private userService) {}
}
