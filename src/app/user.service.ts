import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  /*
   * Default Github user data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  initialUser: User = {
    login: "octocat",
    id: 1,
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
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
    name: "monalisa octocat",
    company: "GitHub",
    blog: "https://github.com/blog",
    location: "San Francisco",
    email: "octocat@github.com",
    hireable: false,
    bio: "There once was...",
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
    created_at: "2008-01-14T04:33:35Z",
    updated_at: "2008-01-14T04:33:35Z"
  };

  app: any = null;

  init() {
    this.app = {
      isLoading: true,
      visibleCards: {},
      selectedCities: [],
      spinner: document.querySelector('.loader'),
      cardTemplate: document.querySelector('.cardTemplate'),
      container: document.querySelector('.main'),
      addDialog: document.querySelector('.dialog-container'),
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  }

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
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

  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  updateForecastCard(data) {
    var dataLastUpdated = new Date(data.created);
    var sunrise = data.channel.astronomy.sunrise;
    var sunset = data.channel.astronomy.sunset;
    var current = data.channel.item.condition;
    var humidity = data.channel.atmosphere.humidity;
    var wind = data.channel.wind;

    var card = this.app.visibleCards[data.key];
    if (!card) {
      card = this.app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.location').textContent = data.label;
      card.removeAttribute('hidden');
      this.app.container.appendChild(card);
      this.app.visibleCards[data.key] = card;
    }

    // Verifies the data provide is newer than what's already visible
    // on the card, if it's not bail, if it is, continue and update the
    // time saved in the card
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = data.created;

    card.querySelector('.description').textContent = current.text;
    card.querySelector('.date').textContent = current.date;
    // TODO sort out icons
    //card.querySelector('.current .icon').classList.add(this.getIconClass(current.code));
    card.querySelector('.current .temperature .value').textContent =
      Math.round(current.temp);
    card.querySelector('.current .sunrise').textContent = sunrise;
    card.querySelector('.current .sunset').textContent = sunset;
    card.querySelector('.current .humidity').textContent =
      Math.round(humidity) + '%';
    card.querySelector('.current .wind .value').textContent =
      Math.round(wind.speed);
    card.querySelector('.current .wind .direction').textContent = wind.direction;
    var nextDays = card.querySelectorAll('.future .oneday');
    var todaysDate = new Date();
    var today = todaysDate.getDay();
    for (var i = 0; i < 7; i++) {
      var nextDay = nextDays[i];
      var daily = data.channel.item.forecast[i];
      if (daily && nextDay) {
        nextDay.querySelector('.date').textContent =
          this.app.daysOfWeek[(i + this.app.today) % 7];

        // TODO sort out icons
        //nextDay.querySelector('.icon').classList.add(this.getIconClass(daily.code));
        nextDay.querySelector('.temp-high .value').textContent =
          Math.round(daily.high);
        nextDay.querySelector('.temp-low .value').textContent =
          Math.round(daily.low);
      }
    }
    if (this.app.isLoading) {
      this.app.spinner.setAttribute('hidden', true);
      this.app.container.removeAttribute('hidden');
      this.app.isLoading = false;
    }
  };

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  getForecast(key: any, name?: any) {
    //let url = 'http://api.openweathermap.org/data/2.5/weather?id=' + key + '&units=metric&APPID=' + this.APIKEY,
      let context = this;
      let url = 'https://api.github.com/users/jDman';

    // Fetch and return the latest data.
    return this.http.get(url)
      .map((response: Response) => {
        if (this.app.isLoading) {
          this.app.spinner.setAttribute('hidden', true);
          this.app.container.removeAttribute('hidden');
          this.app.isLoading = false;
        }

        return context.extractData(response);
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  };

  extractData(response: Response) {
    let body = response.json();

    return body || {};
  }

  // Iterate all of the cards and attempt to get the latest forecast data
  updateForecasts() {
    var keys = Object.keys(this.app.visibleCards),
        context = this;
    keys.forEach(function(key) {
      context.getForecast(key);
    });
  };

  constructor(private http: Http) { }
}
