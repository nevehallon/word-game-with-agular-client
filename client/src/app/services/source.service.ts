import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor() {}

  public numSource = 101;

  private playerRackSource = new BehaviorSubject([]);
  currentPlayerRack = this.playerRackSource.asObservable();

  changePlayerRack(rack: any[]) {
    this.playerRackSource.next(rack);
  }

  wordArr = ['C', 'A', 'T'];

  private boardSource = new BehaviorSubject(
    // Array(225)
    //   .fill('')
    //   .map(() => ({ data: [] }))
    Array(225)
      .fill('')
      .map((x, i) => {
        if (i > 111 && i < 115)
          return {
            data: [
              {
                content: {
                  letter: this.wordArr.splice(0, 1),
                  points: 1,
                },
                id: `tile${++this.numSource}`,
                class: ['tile'],
                'data-drag': this.numSource,
              },
            ],
          };
        return {
          data: [],
        };
      })
  );
  currentBoard = this.boardSource.asObservable();

  changeBoard(squares) {
    this.boardSource.next(squares);
  }

  private btnAttrSource = new BehaviorSubject({
    bagBtn: { numTiles: 100 },
    scoresBtn: { player: 0, rival: 0 },
    swapRecall: { text: 'Swap', icon: 'swap_vertical_circle' },
    passPlay: { text: 'Pass', icon: '', bgColor: '' },
    zoomBtn: { isIn: true },
  });
  currentBtnAttr = this.btnAttrSource.asObservable();

  changeBtnAttr(attrs) {
    this.btnAttrSource.next(attrs);
  }
}
