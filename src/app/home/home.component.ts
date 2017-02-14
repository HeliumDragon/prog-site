import { Component, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from '../user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .card-link {
      text-decoration: none;
      color: #444;
    }
  `]
})
export class HomeComponent {
  cards: Array<User> = [];

  search$ = new Subject<string>();

  ngOnInit() {
    this.userService.init();

    this.search$
      .subscribe(user => this.getUser(user));

    this.initialLoad();
  }

  initialLoad() {
    let prevSelectedUsers = this.checkSavedUsers();

    if (prevSelectedUsers) {
      this.userService.stopLoadSpinner();

      this.cards = JSON.parse(prevSelectedUsers);
    } else {
      this.getUser(this.userService.initialUser.login, true);
    }
  }

  onAddUser(user) {
    this.getUser(user);
  }

  // Iterate all of the cards and attempt to get the latest user data
  updateUsers() {
    this.userService.updateUsers(this.cards).forEach(user => {
      user.subscribe(result => {
        this.cards.forEach(card => {
          if (result.id === card.id) {
            card = result;
          }
        })
      });
    });
  };

  /************************************************************************
     * NOTE: To simplify this codelab, we've used localStorage.
     *   localStorage is a synchronous API and has serious performance
     *   implications. It should not be used in production applications!
     ************************************************************************/

  // Cache the users in the apps cards array
  saveUsers() {
    let selectedUsers = JSON.stringify(this.cards);

    localStorage.setItem('selectedUsers', selectedUsers);
  }

  // Check localStorage for previously saved cards
  checkSavedUsers() {
    return localStorage.getItem('selectedUsers');
  }

  getFreshUserData(username: string): Subject<User> {
    return this.userService.getUser(username)
  }

  getUser(username: string, initial?: boolean): Array<User> {
    return this.userService.getUser(username, initial)
      .subscribe(results => {
        let uniqUsers = this.cards.every(item => {
          return item.id !== results.id;
        });

        if (uniqUsers)
          this.cards.push(results);

          this.saveUsers();

          return this.cards;
      });
  }

  constructor(@Inject('user') private userService) {}
}
