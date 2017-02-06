import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() onRefresh = new EventEmitter<boolean>();

  title: string = 'Github Users PWA';

  onMouseUp(e) {
    let eventId = e.target.id;

    switch(eventId) {
      case 'butRefresh':
        this.refresh();
        break;
      case 'butAdd':
        this.add();
        break;
    }
  }

  refresh () {
    // Refresh all of the forecasts
    this.onRefresh.emit(true);
    //this.userService.updateUsers();
  };

  add() {
    // Open/show the add new city dialog
    this.userService.toggleAddDialog(true);
  };

  constructor(@Inject('user') private userService) {}
}
