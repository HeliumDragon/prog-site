import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject('forecast') private forecast) {}

  ngOnInit() {
    this.forecast.init();
    this.forecast.updateForecastCard(this.forecast.initialWeatherForecast);
  }
}
