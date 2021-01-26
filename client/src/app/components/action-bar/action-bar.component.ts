import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private source: SourceService,
    public dialog: MatDialog,
    private gridService: CreateGridService,
    private gameService: GameLogicService,
    private validate: BoardValidatorService
  ) {}

  tiles: any[] = [];
  rackSubscription: Subscription;

  squares: any[];
  boardSubscription: Subscription;

  onOff = true;
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
      width: '75%',
      data: {
        type: 'settings',
      },
    });
  }

  swapRecall(action: 'Recall' | 'Swap') {
    if (action === 'Recall') {
      let tilesToReturn: any[] = [];
      let newBoard = this.squares.map((square) => {
        if (square.data[0]?.class.includes('hot')) {
          // console.dir(square.data[0].class);
          tilesToReturn.push(square.data[0]);
          return { data: [] };
        }
        return square;
      });

      this.source.changeBoard(newBoard);
      this.source.changePlayerRack([...this.tiles, ...tilesToReturn]);

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

        console.log(this.gridService.gridState);
      }, 0);

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
    if (!this.gameService.isZoomed) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);

    let $board: HTMLElement = document.querySelector('#board');

    $board.classList.remove('zoomedIn');
    this.gameService.isZoomed = false;

    btnAttrs.zoomBtn.isIn = true;

    this.source.changeBtnAttr(btnAttrs);
  }
  zoomIn() {
    if (this.gameService.isZoomed) return;
    const btnAttrs: BtnAttrs = _.cloneDeep(this.btnAttributes);
    let $board: HTMLElement = document.querySelector('#board');
    let centerSquare = document.querySelector('[data-location="7,7"]');
    $board.classList.add('zoomedIn');
    centerSquare.scrollIntoView({ block: 'center', inline: 'center' });
    this.gameService.isZoomed = true;

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
        setTimeout(() => {
          this.onOff = false;
        }, 0);
        setTimeout(() => {
          this.onOff = true;
        }, 0);
      }
    );
    this.boardSubscription = this.source.currentBoard.subscribe(
      (squares) => (this.squares = squares)
    );
  }

  ngOnDestroy(): void {
    this.rackSubscription.unsubscribe();
    this.btnAttributeSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }
}
