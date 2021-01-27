import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CreateGridService } from 'src/app/services/create-grid.service';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { BoardValidatorService } from 'src/app/services/board-validator.service';
import { SourceService } from 'src/app/services/source.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import _ from 'lodash';
import { BtnAttrs } from 'src/app/interfaces/btn-attrs';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  squares: any[] = [];
  // = Array(225)
  //   .fill('')
  //   .map(() => ({ data: [] }));
  btnAttributes: BtnAttrs = null;
  btnAttributeSubscription: Subscription;

  tw = [0, 7, 14, 105, 119, 210, 217, 224];

  //prettier-ignore
  dw = [16, 28, 32, 42, 48, 56, 64, 70, 112, 154, 160, 168, 176, 182, 192, 196, 208];

  tl = [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204];

  //prettier-ignore
  dl = [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221];

  multiplier(num) {
    return {
      tw: this.tw.includes(num) ? true : false,
      dw: this.dw.includes(num) ? true : false,
      tl: this.tl.includes(num) ? true : false,
      dl: this.dl.includes(num) ? true : false,
    };
  }

  private touchTime = 0;

  zoomAction(e: MouseEvent) {
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchTime < 800) {
        // double click occurred
        this.touchTime = 0;
        if (!this.gameService.isZoomed) {
          return this.zoomIn(e.target as HTMLElement);
        }
        return this.zoomOut();
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  }

  zoomOut() {
    if (!this.gameService.isZoomed) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);

    let $board: HTMLElement = document.querySelector('#board');

    $board.classList.remove('zoomedIn');
    this.gameService.isZoomed = false;

    btnAttrs.zoomBtn.isIn = true;

    this.source.changeBtnAttr(btnAttrs);
  }

  zoomIn(target: HTMLElement, overRide: boolean = false) {
    if (this.gameService.isZoomed && !overRide) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);
    let $board: HTMLElement = document.querySelector('#board');
    $board.classList.add('zoomedIn');
    this.gameService.isZoomed = true;
    btnAttrs.zoomBtn.isIn = false;
    this.source.changeBtnAttr(btnAttrs);

    if (overRide) {
      return target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
    target.scrollIntoView({ block: 'center', inline: 'center' });
  }

  bodyElement: HTMLElement = document.body;

  dragStart(event: CdkDragStart) {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'grabbing';
  }

  drop(event: CdkDragDrop<string[]>) {
    this.bodyElement.classList.remove('inheritCursors');
    this.bodyElement.style.cursor = 'unset';
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.repaintBoard();
    setTimeout(() => {
      this.zoomIn(event.container.element.nativeElement, true);

      // TODO: if blank show blank options in modal
      let data: any = event.container.data[0];

      if (data.content.letter === '') {
        const dialogRef = this.dialog.open(ModalDialogComponent, {
          maxWidth: '99vw',
          id: 'swapModal',
          disableClose: true,
          data: {
            type: 'blankOptions',
            tileInfo: data,
          },
        });

        dialogRef
          .afterClosed()
          .pipe(take(1))
          .subscribe(
            (result) => {
              if (result === false) {
                let index = event.container.element.nativeElement.getAttribute(
                  'data-number'
                );
                this.squares[index].data = [];
                return this.source.changeBoard(this.squares);
              }
              data.content = result;
              this.source.changeBoard(this.squares);
              this.zoomIn(event.container.element.nativeElement, true);
            },
            console.error,
            () => this.repaintBoard()
          );
        return;
      }

      this.source.changeBoard(this.squares);
      // console.log(this.gridService.gridState);
    }, 0);
  }

  repaintBoard() {
    setTimeout(() => {
      this.gameService.isValidMove = false;
      this.gridService.updateGameState(document);
      this.gameService.isValidMove = this.validate.validate(
        this.gridService.gridState,
        this.gameService.firstTurn,
        this.gameService.wordsLogged,
        true,
        document
      );
    }, 0);
  }

  onlyOneTile(item: CdkDrag, list: CdkDropList) {
    if (list.data.length === 1) return false;
    return true;
  }

  constructor(
    private gridService: CreateGridService,
    private gameService: GameLogicService,
    private source: SourceService,
    public dialog: MatDialog,
    private validate: BoardValidatorService
  ) {
    validate.init(this.source);
  }

  boardSubscription: Subscription;

  ngOnInit(): void {
    this.boardSubscription = this.source.currentBoard.subscribe(
      (squares) => (this.squares = squares)
    );
    this.btnAttributeSubscription = this.source.currentBtnAttr.subscribe(
      (attrs) => {
        this.btnAttributes = attrs;
        // setTimeout(() => {
        //   this.onOff = false;
        // }, 0);
        // setTimeout(() => {
        //   this.onOff = true;
        // }, 0);
      }
    );
  }

  ngOnDestroy(): void {
    this.btnAttributeSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.gridService.updateGameState(document);
  }
}
