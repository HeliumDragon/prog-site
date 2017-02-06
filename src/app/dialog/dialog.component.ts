import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() addUser = new EventEmitter<string>();

  user: string = '';

  onMouseUp(e) {
    let eventId = e.target.id;

    switch(eventId) {
      case 'butAddCity':
        this.add(e);
        break;
      case 'butAddCancel':
        this.cancel(e);
        break;
    }
  }

  add(e) {
    // Add the newly selected city
    console.log(e, this.user);
    this.addUser.emit(this.user);
    //this.userService.getForecast(this.user);
    this.userService.toggleAddDialog(false);
  }

  cancel(e) {
    // Close the add new city dialog
    this.userService.toggleAddDialog(false);
  }

  constructor(@Inject('user') private userService) { }
}
