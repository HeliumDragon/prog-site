import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  onMouseUp(e) {
    console.log('clicked ', e.target.id);
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
    this.forecast.updateForecasts();
  };

  add() {
    // Open/show the add new city dialog
    this.forecast.toggleAddDialog(true);
  };

  constructor(@Inject('forecast') private forecast) {}

  ngOnInit() {
    console.log('header init');
  }

}
