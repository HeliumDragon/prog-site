import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() key;
  @Input() location;
  @Input() date;
  @Input() description;
  @Input() iconCode;
  @Input() temperature
  @Input() humidity;
  @Input() sunrise;
  @Input() sunset;
  @Input() windSpeed;
  @Input() windDirection;

  ngOnInit() {

  }

  constructor() { }
}
