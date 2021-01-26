import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor() {
    console.log('source');
  }

  public numSource = 101;

  private playerRackSource = new BehaviorSubject([]);
  currentPlayerRack = this.playerRackSource.asObservable();

  changePlayerRack(rack: any[]) {
    this.playerRackSource.next(rack);
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
