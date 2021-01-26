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

  private boardSource = new BehaviorSubject(
    Array(225)
      .fill('')
      .map(() => ({ data: [] }))
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
