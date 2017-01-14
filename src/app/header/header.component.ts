import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  onMouseUp(e) {
    console.log('clicked ', e);
  }

  constructor() { }

  ngOnInit() {
    console.log('header init');
  }

}
