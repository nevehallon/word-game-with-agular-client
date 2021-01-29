import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { BtnAttrs } from 'src/app/interfaces/btn-attrs';
import { SourceService } from 'src/app/services/source.service';
import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { CreateGridService } from 'src/app/services/create-grid.service';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { BoardValidatorService } from 'src/app/services/board-validator.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit, OnDestroy {
  constructor(
    public source: SourceService,
    public dialog: MatDialog,
    private gridService: CreateGridService,
    public gameService: GameLogicService,
    private validate: BoardValidatorService
  ) {}

  remainingTiles;

  tiles: any[] = [];
  rackSubscription: Subscription;

  squares: any[];
  boardSubscription: Subscription;

  btnAttributes: BtnAttrs = null;
  btnAttributeSubscription: Subscription;

  mixTiles() {
    if (this.tiles.length < 2) return;

    let shuffledRack =
      this.tiles.length === 2 ? this.tiles.reverse() : _.shuffle(this.tiles);

    this.source.changePlayerRack(shuffledRack);
  }

  showBagContent() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'bag',
      },
    });
  }

  showSettings() {
    this.dialog.open(ModalDialogComponent, {
      maxWidth: '75vh',
      width: '75%',
      data: {
        type: 'settings',
      },
    });
  }

  prePass(wasClicked, isSwap, isAI, legalClick) {
    // legalClick = true; //TODO: remove me!!

    if (legalClick === false) return;
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'confirmPass',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(
        (result) => {
          if (result === false) {
            return;
          }
          let remove: boolean = this.gameService.pass(
            wasClicked,
            isSwap,
            isAI,
            legalClick,
            document
          );
          this.zoomOut();
          if (remove === true) {
            // console.log(this.gridService.gridState);
          }
        },
        console.error
        // () => this.gameService.pcPlay(document)
      );
  }

  passPlay(action) {
    if (action === 'Pass') {
      this.prePass(true, false, false, this.source.playersTurn);

      return;
    }

    this.zoomOut();
    this.gameService.play(false, document);
  }

  swapRecall(action: 'Recall' | 'Swap') {
    if (action === 'Recall') {
      let tilesToReturn: any[] = [];
      let newBoard = this.squares.map((square) => {
        if (square.data[0]?.class.includes('hot')) {
          if (square.data[0].content.points === 0) {
            square.data[0].content.letter = '';
          }

          tilesToReturn.push(square.data[0]);
          return { data: [] };
        }
        return square;
      });

      this.source.changeBoard(newBoard);
      this.source.changePlayerRack([...this.tiles, ...tilesToReturn]);

      setTimeout(() => {
        this.source.isValidMove = false;
        this.gridService.updateGameState(document);
        this.source.isValidMove = this.validate.validate(
          this.gridService.gridState,
          this.source.firstTurn,
          this.source.wordsLogged,
          true,
          document
        );
      }, 0);

      this.zoomOut();

      return;
    }

    this.dialog.open(ModalDialogComponent, {
      maxWidth: '99vw',
      id: 'swapModal',
      data: {
        type: 'swap',
      },
    });
  }

  zoomOut() {
    if (!this.source.isZoomed) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);

    let $board: HTMLElement = document.querySelector('#board');

    $board.classList.remove('zoomedIn');
    this.source.isZoomed = false;

    btnAttrs.zoomBtn.isIn = true;

    this.source.changeBtnAttr(btnAttrs);
  }
  zoomIn() {
    if (this.source.isZoomed) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);
    let $board: HTMLElement = document.querySelector('#board');
    let centerSquare = document.querySelector('[data-location="7,7"]');
    $board.classList.add('zoomedIn');
    centerSquare.scrollIntoView({ block: 'center', inline: 'center' });
    this.source.isZoomed = true;

    btnAttrs.zoomBtn.isIn = false;

    this.source.changeBtnAttr(btnAttrs);
  }

  // $("#zoomOut").click(zoomOut);
  // $("#zoomIn").click(() => zoomIn($('[data-location="7,7"]')[0]));
  // $("#board .column").dblclick((e) => {
  //   isZoomed ? zoomOut() : zoomIn(e.target);
  //   e.stopImmediatePropagation();
  // });

  // $("#scoresBtn").click(showScoreHistory);
  // $("#passPlay").click(() =>
  //   $("#passPlay").text().includes("Pass") ? prePass(true, false, false, playersTurn) : play()
  // );

  // $("#startGame").click(rematch);

  ngOnInit(): void {
    this.rackSubscription = this.source.currentPlayerRack.subscribe(
      (tiles) => (this.tiles = tiles)
    );
    this.btnAttributeSubscription = this.source.currentBtnAttr.subscribe(
      (attrs) => {
        this.btnAttributes = attrs;
      }
    );
    this.boardSubscription = this.source.currentBoard.subscribe((squares) => {
      this.squares = squares;
      this.remainingTiles = 100 - this.source.lettersUsed;
    });
  }

  ngOnDestroy(): void {
    this.rackSubscription.unsubscribe();
    this.btnAttributeSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }
}
