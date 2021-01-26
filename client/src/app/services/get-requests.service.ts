import { Injectable } from '@angular/core';
import { LetterToPointsService } from './letter-to-points.service.js';
import { getTrie } from '../../assets/trie-prefix-tree/index.js';
import { HttpClient } from '@angular/common/http';
import _ from 'lodash';
import * as localforage from 'localforage';

@Injectable({
  providedIn: 'root',
})
export class GetRequestsService {
  url: string = 'http://localhost:3000';

  async checkServerStatus() {
    let requestStatus: Promise<any> = this.http
      .get(`${this.url}/wordFinder?letters=aa&numBlanks=0`, {
        observe: 'response',
      })
      .toPromise();

    try {
      let { status } = await requestStatus;

      if (status == 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getWordTrieStr() {
    let data: Promise<any> = this.http
      .get(`${this.url}/wordTrieStr`, {
        observe: 'response',
      })
      .toPromise();
    try {
      if (
        (await localforage.getItem('wordTrieStr')) &&
        (await localforage.getItem('reverseWordTrieStr'))
      ) {
        return;
      }
      let {
        body: { wordTrieStr, reverseWordTrieStr },
      } = await data;

      let localTrieStr = wordTrieStr;
      let localReverseTrieStr = reverseWordTrieStr;
      await localforage.setItem('wordTrieStr', localTrieStr);
      await localforage.setItem('reverseWordTrieStr', localReverseTrieStr);
      getTrie();
    } catch (error) {
      console.error(error);
    }
  }

  async getWordValues(str, numBlanks = 0) {
    let data: Promise<any> = this.http
      .get(`${this.url}/wordFinder?letters=${str}&numBlanks=${numBlanks}`, {
        observe: 'response',
      })
      .toPromise();

    let result = [];

    try {
      let {
        body: { wordsFound },
      } = await data;
      wordsFound.forEach((word) => {
        result.push({
          word,
          points: [...word].reduce((accumulator, currentVal) => {
            return (
              accumulator +
              this.letters
                .get()
                .find((l) => l.letter == currentVal.toUpperCase()).points
            );
          }, 0),
        });
      });

      let wordsByValue = _.orderBy(result, ['points', 'word'], ['desc']);

      return wordsByValue;
    } catch (error) {
      console.error(error);
    }
  }

  constructor(
    private letters: LetterToPointsService,
    private http: HttpClient
  ) {}
}