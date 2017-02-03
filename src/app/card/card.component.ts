import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() name;
  @Input() location;
  @Input() company;
  @Input() date;
  @Input() bio;
  @Input() avatar;

  constructor() { }
}
