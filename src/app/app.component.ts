import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards: Array<User> = [];

  search$ = new Subject<string>();

  ngOnInit() {
    this.userService.init();
    
    this.search$
      .subscribe(forecast => this.getUser(forecast));

    this.getUser(this.userService.initialUser.login);
  }

  onAddUser(user) {
    this.getUser(user);
  }

  onRefresh(refresh) {
    if (refresh)
      this.updateUsers();
  };

  // Iterate all of the cards and attempt to get the latest user data
  updateUsers() {
    let cards = this.cards;

    cards.forEach((user, index) => {
      let updatedUser = this.getFreshUserData(user.login)
        .subscribe(result => {
          cards[index] = result;
        });
    }, this);
  };

  getFreshUserData(username: string): Subject<User> {
    return this.userService.getUser(username)
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
