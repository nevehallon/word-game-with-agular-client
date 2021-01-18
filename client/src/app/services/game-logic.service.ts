import { Injectable } from '@angular/core';
import { ScrabbleLettersService } from './scrabble-letters.service';
import _ from 'lodash';
import { GetRequestsService } from './get-requests.service';
@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  constructor(
    private letters: ScrabbleLettersService,
    private http: GetRequestsService
  ) {}

  DEBUG_MODE = false; //? change to true for the AI to play it self

  playerScore = 0;
  computerScore = 0;
  lettersUsed = 0;
  passCount = 0;
  isZoomed = false;
  fired = false;
  overRack = false;
  firstTurn = true;
  isValidMove = false;
  playersTurn = false;
  wordsLogged = [];
  history = [];
  rivalRack = [];
  hints = JSON.parse(localStorage.getItem('hints')) || { show: true };

  bag = _.shuffle(_.shuffle(this.letters.get()));
  // bag = _.drop(bag, 86); //? uncomment for doing tests on a shorter game

  deal2Player() {
    let playerRack = [];
    for (let i = 0; i < 7; i++) {
      let tile = _.pullAt(this.bag, [0])[0];
      playerRack.push(tile);
    }
    return playerRack;
  }

  deal2PC() {
    for (let i = 0; i < 7; i++) {
      this.rivalRack.push(_.pullAt(this.bag, [0])[0]);
    }
  }

  whoStarts() {
    let bagSim = _.shuffle(this.bag);
    return {
      player: _.pullAt(bagSim, [0])[0].letter,
      pc: _.pullAt(bagSim, [0])[0].letter,
    };
  }

  startGame($document: HTMLDocument) {
    $document.querySelector<HTMLElement>('#startGame').style.display = 'none';

    let { player, pc } = this.whoStarts();
    if (player === pc) return this.startGame($document);

    this.lettersUsed = 14;
    $document.querySelector<HTMLElement>('#bagBtn').innerText = String(
      100 - this.lettersUsed
    );

    $document
      .querySelector<HTMLElement>('#startGame')
      .setAttribute('disabled', 'disabled');

    let playerRack;
    if (player < pc) {
      playerRack = this.deal2Player();
      this.deal2PC();
      this.playersTurn = true;
      // this.alertStarter("You won the draw and will start"); //TODO:
      if (this.DEBUG_MODE) {
        this.playersTurn = true;
        // this.pcPlay();TODO:
      }
    } else {
      this.playersTurn = false;
      this.deal2PC();
      playerRack = this.deal2Player();
      // this.alertStarter("Opponent won the draw and will start"); TODO:
      setTimeout(() => {
        // this.pcPlay(); //TODO:
      }, 3000);
    }

    return playerRack;
  }
}
