import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {
  /*
   * Default Github user data that is presented when the user first uses the app,
   * or when the user has not saved any users.
   */
  initialUser: User = {
    login: "octocat",
    id: 1,
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    followers_url: "https://api.github.com/users/octocat/followers",
    following_url: "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    repos_url: "https://api.github.com/users/octocat/repos",
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    received_events_url: "https://api.github.com/users/octocat/received_events",
    type: "User",
    site_admin: false,
    name: "The Octocat",
    company: "GitHub",
    blog: "https://github.com/blog",
    location: "San Francisco",
    email: "octocat@github.com",
    hireable: false,
    bio: "",
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
    created_at: "2011-01-14T04:33:35Z",
    updated_at: "2011-01-14T04:33:35Z"
  };

  app: any = null;

  init() {
    this.app = {
      isLoading: true,
      spinner: document.querySelector('.loader'),
      container: document.querySelector('.main'),
      addDialog: document.querySelector('.dialog-container'),
    }
  }

  /*****************************************************************************
   *
   * Methods to update the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new city dialog.
  toggleAddDialog(visible) {
    if (visible) {
      this.app.addDialog.classList.add('dialog-container--visible');
    } else {
      this.app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  /*
   * Gets a user for a specific Github account.
   */
  getUser(username: any, initial?: any) {
    if (initial) {
      this.stopLoadSpinner();
      return Observable.of(this.initialUser);
    }
    let context = this,
        url = 'https://api.github.com/users/' + username;

    // Fetch and return the latest data.
    return this.http.get(url)
      .map((response: Response) => {
        this.stopLoadSpinner();

        return context._extractData(response);
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  };

  stopLoadSpinner(): void {
    if (this.app.isLoading) {
      this.app.spinner.setAttribute('hidden', true);
      this.app.container.removeAttribute('hidden');
      this.app.isLoading = false;
    }
  }

  private _extractData(response: Response) {
    let body = response.json();

    return body || {};
  }

  constructor(private http: Http) { }
}
