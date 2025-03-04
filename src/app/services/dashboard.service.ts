import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

   // Simulated Tweet Data
   getTweets() : any {
    return [
      { user: 'John Doe', handle: 'johndoe', content: 'This is my first tweet!' },
      { user: 'Jane Smith', handle: 'janesmith', content: 'Loving this Twitter clone!' },
      { user: 'Angular Dev', handle: 'angular_dev', content: 'Angular Material makes UI easy!' }
    ];
  }

  // Simulated "Who to Follow" Data
  getSuggestedUsers() {
    return [
      { name: 'Elon Musk', handle: 'elonmusk', avatar: 'https://source.boringavatars.com/beam/40/elon' },
      { name: 'Angular', handle: 'angular', avatar: 'https://source.boringavatars.com/beam/40/angular' },
      { name: 'Google Devs', handle: 'googledevs', avatar: 'https://source.boringavatars.com/beam/40/google' },
    ];
  }

  // Simulated Trending Topics
  getTrends() {
    return [
      { topic: '#Angular', tweets: '120K Tweets' },
      { topic: '#TypeScript', tweets: '95K Tweets' },
      { topic: '#WebDev', tweets: '80K Tweets' }
    ];
  }
}
