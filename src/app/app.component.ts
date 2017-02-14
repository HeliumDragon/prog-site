import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _viewComponent;

  onRefresh(refresh) {
    if (refresh) this._viewComponent.updateUsers();
  }

  onActivate(routeOutlet) {
    setTimeout(() => this._viewComponent = routeOutlet, 0);
  }

  constructor() {}
}
