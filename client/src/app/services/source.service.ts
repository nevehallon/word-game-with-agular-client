import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Square } from '../interfaces/square';
import { ScrabbleLettersService } from './scrabble-letters.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private letters: ScrabbleLettersService) {}

  public numSource = 101;

  private playerRackSource = new BehaviorSubject([]);
  currentPlayerRack = this.playerRackSource.asObservable();

  changePlayerRack(rack: any[]) {
    this.playerRackSource.next(rack);
  }

  addToPlayerRack(newTiles) {
    this.currentPlayerRack.pipe(take(1)).subscribe((result: any[]) => {
      this.playerRackSource.next([...result, newTiles]);
    });
  }

  wordArr = ['C', 'A', 'T']; //? uncomment to test AI after "CAT" is played for first turn

  private boardSource = new BehaviorSubject(
    Array(225)
      .fill('')
      .map(() => ({ data: [] }))
    // Array(225)
    //   .fill('')
    //   .map((x, i) => {
    //     if (i > 111 && i < 115)
    //       return {
    //         data: [
    //           {
    //             content: {
    //               letter: this.wordArr.splice(0, 1)[0],
    //               points: 1,
    //             },
    //             id: `tile${++this.numSource}`,
    //             class: ['tile'],
    //             'data-drag': this.numSource,
    //           },
    //         ],
    //       };
    //     return {
    //       data: [],
    //     };
    //   }) //? uncomment to test AI after "CAT" is played for first turn
  );
  currentBoard = this.boardSource.asObservable();

  changeBoard(squares) {
    this.boardSource.next(squares);
  }

  getBoard() {
    let board;
    this.currentBoard.pipe(take(1)).subscribe((result: any[]) => {
      board = result;
    });
    return board;
  }

  private btnAttrSource = new BehaviorSubject({
    bagBtn: { numTiles: 100 },
    scoresBtn: { player: 0, rival: 0 },
    swapRecall: { text: 'Swap', icon: { isUndo: false } },
    passPlay: { text: 'Pass', icon: '', bgColor: '' },
    zoomBtn: { isIn: true },
  });
  currentBtnAttr = this.btnAttrSource.asObservable();

  changeBtnAttr(attrs) {
    this.btnAttrSource.next(attrs);
  }

  getBtnAttr() {
    let btnAttr;
    this.currentBtnAttr.pipe(take(1)).subscribe((result) => {
      btnAttr = result;
    });
    return btnAttr;
  }

  public tw = [0, 7, 14, 105, 119, 210, 217, 224];

  //prettier-ignore
  public dw = [16, 28, 32, 42, 48, 56, 64, 70, 112, 154, 160, 168, 176, 182, 192, 196, 208];

  public tl = [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204];

  //prettier-ignore
  public dl = [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221];

  public DEBUG_MODE = false; //? change to true for the AI to play it self

  public loaderShown = false;
  public playerScore = 0;
  public computerScore = 0;
  public lettersUsed = 0;
  public passCount = 0;
  public isZoomed = false;
  public fired = false;
  public overRack = false;
  public firstTurn = true;
  public isValidMove: any = false;
  public playersTurn = false;
  public wordsLogged = [];
  public history = [];
  public rivalRack = [];
  // hints = JSON.parse(localStorage.getItem('hints')) || { show: true };

  public bag = _.shuffle(_.shuffle(this.letters.get()));
  // bag = _.drop(bag, 86); //? uncomment for doing tests on a shorter game
}
