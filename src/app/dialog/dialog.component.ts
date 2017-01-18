import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject('forecast') private forecast) { }

  ngOnInit() {}

  city: string = '';
  cityText: string = '';

  onMouseUp(e) {
    let eventId = e.target.id;

    switch(eventId) {
      case 'butAddCity':
        this.addCity(e);
        break;
      case 'butAddCancel':
        this.addCancel(e);
        break;
    }
  }

  addCity(e) {
    // Add the newly selected city
    var key = this.city;
    var label = this.cityText;
    console.log(e, key, label);
    this.forecast.getForecast(key, label, this.forecast.initialWeatherForecast);
    this.forecast.toggleAddDialog(false);
  }

  addCancel(e) {
    console.log(e);

    // Close the add new city dialog
    this.forecast.toggleAddDialog(false);
  }

}
