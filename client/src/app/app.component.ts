import { Component } from '@angular/core';
import * as localforage from 'localforage';
// import { CreateGridService } from './services/create-grid.service';
import { GetRequestsService } from './services/get-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: GetRequestsService) {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.WEBSQL],
      name: 'Scrabble_Game',
    });

    http.getWordTrieStr();
    // (async () => {
    //   console.log(await this.http.getWordValues('app'));
    // })();
  }
}
