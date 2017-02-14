import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../user';

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  userName: string;
  card: User;

  ngOnInit() {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.userName)
      .subscribe(result => {
        console.log(result);
        this.card = result;
      });
  }

  constructor(
    @Inject('user') private userService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
}
