import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  initialWeatherForecast = {
    key: '2459115',
    label: 'New York, NY',
    created: '2016-07-22T01:00:00Z',
    channel: {
      astronomy: {
        sunrise: "5:43 am",
        sunset: "8:21 pm"
      },
      item: {
        condition: {
          text: "Windy",
          date: "Thu, 21 Jul 2016 09:00 PM EDT",
          temp: 56,
          code: 24
        },
        forecast: [
          {code: 44, high: 86, low: 70},
          {code: 44, high: 94, low: 73},
          {code: 4, high: 95, low: 78},
          {code: 24, high: 75, low: 89},
          {code: 24, high: 89, low: 77},
          {code: 44, high: 92, low: 79},
          {code: 44, high: 89, low: 77}
        ]
      },
      atmosphere: {
        humidity: 56
      },
      wind: {
        speed: 25,
        direction: 195
      }
    }
  };



  constructor(@Inject('forecast') private forecast) {
    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    // document.getElementById('butAddCity').addEventListener('click', function() {
    //   // Add the newly selected city
    //   var select = document.getElementById('selectCityToAdd');
    //   var selected = select.options[select.selectedIndex];
    //   var key = selected.value;
    //   var label = selected.textContent;
    //
    //   forecast.getForecast(key, label, context.initialWeatherForecast);
    //   forecast.toggleAddDialog(false);
    // });
    //
    // document.getElementById('butAddCancel').addEventListener('click', function() {
    //   // Close the add new city dialog
    //   forecast.toggleAddDialog(false);
    // });
  }
}
