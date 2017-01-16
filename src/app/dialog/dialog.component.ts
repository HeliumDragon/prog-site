import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject('forecast') private forecast) { }

  ngOnInit() {}

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
    console.log(e);
  }

  addCancel(e) {
    console.log(e);
  }

}
