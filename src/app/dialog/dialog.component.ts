import { Component, OnInit, Inject, Output } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
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

    //this.city$
    //  .subscribe(city => this.getCity(city));

    //this.forecast.getForecast(key, label, this.forecast.initialWeatherForecast);
    //this.forecastService.toggleAddDialog(false);
  }

  getCity(city: string) {
    console.log(city);
    let key = this.city;
    let label = this.cityText;
    // this.forecastService.getForecast(key, label, this.forecastService.initialWeatherForecast)
    //   .subscribe(results => this.cards = results);
  }

  addCancel(e) {
    console.log(e);

    // Close the add new city dialog
    this.userService.toggleAddDialog(false);
  }

  constructor(@Inject('user') private userService) { }
}
