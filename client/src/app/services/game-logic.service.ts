import { Injectable } from '@angular/core';
import _ from 'lodash';
import { ComputeService } from './compute.service';
import { CreateGridService } from './create-grid.service';
import { BoardValidatorService } from './board-validator.service';
import { SourceService } from './source.service';
import { Square } from '../interfaces/square';
import { BtnAttrs } from '../interfaces/btn-attrs';

import { take } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component';
import { DialogData } from '../interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  constructor(
    public dialog: MatDialog,
    // private http: GetRequestsService,
    private calc: ComputeService,
    private gridService: CreateGridService,
    private validate: BoardValidatorService,
    private source: SourceService
  ) {}

  dialogRef;

  closeDialog(timeOut: number = 0) {
    if (!timeOut) return this.dialogRef.close();
    setTimeout(() => {
      this.dialogRef.close();
    }, timeOut);
  }

  deal2Player() {
    let playerRack = [];
    for (let i = 0; i < 7; i++) {
      let tile = _.pullAt(this.source.bag, [0])[0];
      playerRack.push(tile);
    }
    return playerRack;
  }

  deal2PC() {
    for (let i = 0; i < 7; i++) {
      this.source.rivalRack.push(_.pullAt(this.source.bag, [0])[0]);
    }
  }

  whoStarts() {
    let bagSim = _.shuffle(this.source.bag);
    return {
      player: _.pullAt(bagSim, [0])[0].letter,
      pc: _.pullAt(bagSim, [0])[0].letter,
    };
  }

  startGame($document: HTMLDocument) {
    $document.querySelector<HTMLElement>('#startGame').style.display = 'none';

    let { player, pc } = this.whoStarts();
    if (player === pc) return this.startGame($document);

    this.source.lettersUsed = 14;

    $document
      .querySelector<HTMLElement>('#startGame')
      .setAttribute('disabled', 'disabled');

    let playerRack;
    let data: DialogData;
    if (player < pc) {
      playerRack = this.deal2Player();
      this.deal2PC();
      this.source.playersTurn = true;
      data = {
        type: 'message',
        message: 'You won the draw and will start',
      };

      this.dialogRef = this.dialog.open(ModalDialogComponent, {
        data: data,
      });
      this.closeDialog(2250);
      if (this.source.DEBUG_MODE) {
        this.source.playersTurn = true;
        this.pcPlay($document); //TODO:
      }
    } else {
      this.source.playersTurn = false;
      this.deal2PC();
      playerRack = this.deal2Player();
      data = {
        type: 'message',
        message: 'Opponent won the draw and will start',
      };

      this.dialogRef = this.dialog.open(ModalDialogComponent, {
        data: data,
      });
      this.closeDialog(2250);
      setTimeout(() => {
        this.pcPlay($document); //TODO:
      }, 3000);
    }
    playerRack = playerRack.map((x, i) => ({
      content: x,
      id: `tile${i}`,
      class: ['tile', 'hot'],
      'data-drag': i,
    }));

    this.source.changePlayerRack(playerRack);
  }

  repaintBoard($document: HTMLDocument) {
    this.source.isValidMove = false;
    this.gridService.updateGameState($document);
    this.source.isValidMove = this.validate.validate(
      this.gridService.gridState,
      this.source,
      true,
      $document
    );
  }

  serverCheck = (async () => {
    //   if (!loaderShown) {
    //     loaderShown = true;
    //     toggleModal({
    //       modal: { class: "", content: "" },
    //       modalPlacer: { class: "modal-dialog-centered", content: "" },
    //       modalHeader: { class: "d-none", content: "" },
    //       body: {
    //         class: "text-center",
    //         content: `<h4 class="mb-2">Loading Resources...</h4><div class="spinner-container my-2"><svg class="spinner" data-src="https://s.svgbox.net/loaders.svg?ic=circles" fill="currentColor"></svg></div>`,
    //       },
    //       footer: { class: "d-none", content: "" },
    //       actionButton: { class: "", content: "" },
    //       timeout: 0,
    //       executeClose: false,
    //     });
    //     setModalOptions("static", false); //prevents user from closing modal
    //   }
    //   let status = await checkServerStatus();
    //   if (status) {
    //     toggleModal({
    //       executeClose: true,
    //     });
    //     setModalOptions(true, true);
    //     return startGame();
    //   }
    //   setTimeout(() => {
    //     serverCheck();
    //   }, 1500);
  })();

  pcSwap($document: HTMLDocument) {
    //? .sort((a,b) => b > a ? -1 : 1).filter(x => x !== 0) //for sorting by point value and removing blank tiles
    let numTilesLeftInBag = this.source.bag.slice(0, 7).length;
    let tilesLeftInRivalRack = this.source.rivalRack.slice(0, 7);
    let numTilesLeftInRivalRack = this.source.rivalRack.slice(0, 7).length;

    let bool = numTilesLeftInBag <= numTilesLeftInRivalRack;
    let maxNumTilesToSwap = bool ? numTilesLeftInBag : numTilesLeftInRivalRack;

    this.source.rivalRack = bool
      ? this.source.rivalRack.slice(0, 7 - maxNumTilesToSwap)
      : this.source.rivalRack.slice(7 - maxNumTilesToSwap);

    for (let i = 0; i < maxNumTilesToSwap; i++) {
      if (this.source.bag.length) {
        this.source.rivalRack.push(_.pullAt(this.source.bag, [0])[0]);
      }
    }

    this.source.bag.push(...tilesLeftInRivalRack.slice(0, maxNumTilesToSwap));
    this.source.bag = _.shuffle(_.shuffle(this.source.bag));
    console.log(this.source.rivalRack, this.source.bag);
    this.source.passCount = -1;
    this.pass(true, true, true, undefined, $document);

    //toggle modal
    this.closeDialog();
    this.dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'message',
        message: 'Opponent chose to swap tiles',
      },
    });
    this.closeDialog(2250);
  }

  pcPlay($document: HTMLDocument) {
    let board = this.source.getBoard();
    let newBoard = board.map((square) => {
      if (square.data[0]?.class.includes('pcPlay')) {
        let obj = square.data[0];
        return {
          data: [
            {
              ...obj,
              class: obj.class.filter((klass) => klass !== 'pcPlay'),
            },
          ],
        };
      }
      return square;
    });

    this.source.changeBoard(newBoard);
    this.gridService.updateGameState($document);

    this.dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'loading',
        message: 'Opponent chose to swap tiles',
      },
    });
    //^^ toggle modal
    this.source.playersTurn = false;

    // if (rivalRack.length < 7 && !bag.length && prompt()) {
    //   rivalRack = Array(7).fill({ letter: "Q", points: 10 });
    // }
    // rivalRack = Array(7).fill({ letter: "Q", points: 10 }); //[...rivalRack.slice(0, 6), { letter: "", points: 0 }]; //? uncomment for testing

    // this.zoomOut(); //TODO:
    this.source.rivalRack.sort((a, b) => (b.letter ? 1 : -1)); //make sure that blanks are last tile
    setTimeout(async () => {
      try {
        this.source.isValidMove = await this.calc.calcPcMove(
          this.gridService.gridState,
          $document
        );
        // prettier-ignore
        !this.source.isValidMove && this.source.rivalRack.length && this.source.bag.length ? 
        this.pcSwap($document) : this.source.isValidMove ? 
        this.play(true, $document) : this.source.DEBUG_MODE ? 
        false : this.pass(true, false, true, undefined, $document);
      } catch (error) {
        if (error?.message?.includes('ranch')) {
          return console.error(error);
        }

        console.error(error);
        // this.pcPlay($document);
      }
    }, 250);
  }

  endGame($document: HTMLDocument) {
    let board: Square[] = this.source.getBoard();
    // this.zoomOut();//TODO:
    $document.querySelector('#startGame').removeAttribute('disabled');
    $document.querySelector<HTMLElement>('#startGame').style.display =
      'inherit';
    $document
      .querySelectorAll<HTMLElement>(
        '#actionBar .btn:not(#scoresBtn, #startGame)'
      )
      .forEach((el) =>
        Object.assign(el.style, { 'pointer-events': 'none', display: 'none' })
      ); //?prevent players from continuing (can still see the score history, and shows a button for a rematch)

    // $document.querySelectorAll<HTMLElement>('#board .hot').forEach((el) => {
    //   el.classList.remove('hot');
    // }); TODO:

    board.forEach((x, i) => {
      if (x.data[0].coords) {
        this.source.dl = this.source.dl.filter((num) => num !== i);
        this.source.dw = this.source.dw.filter((num) => num !== i);
        this.source.tl = this.source.tl.filter((num) => num !== i);
        this.source.tw = this.source.tw.filter((num) => num !== i);
      }
    });

    //?remove hot tiles from board

    if (!this.source.rivalRack.length) {
      let sum = Array.from(
        $document.querySelectorAll('#rack .tile div')
      ).reduce((acc, cur) => acc + +cur.innerHTML, 0);

      this.source.history.push({
        isAI: true,
        word: 'Opponent Won',
        points: '',
        score: {
          computerScore: `${this.source.computerScore} + ${sum}`,
          playerScore: `${this.source.playerScore} - ${sum}`,
        },
        skip: false,
      });
      // generateTable(history);//TODO:

      this.source.playerScore -= sum;
      this.source.computerScore += sum;

      this.source.playerScore =
        this.source.playerScore < 0 ? 0 : this.source.playerScore;
      this.source.computerScore =
        this.source.computerScore < 0 ? 0 : this.source.computerScore;
      // $document.querySelector('#playerScore').textContent = String(
      //   this.source.playerScore
      // );
      // $document.querySelector('#pcScore').textContent = String(
      //   this.source.computerScore
      // );
      //? deduct points from player and give them to AI
    }

    if (!$document.querySelectorAll('#rack .tile').length) {
      let sum = this.source.rivalRack.reduce((acc, cur) => acc + cur, 0);

      this.source.history.push({
        isAI: false,
        word: 'Player Won',
        points: '',
        score: {
          computerScore: `${this.source.computerScore} - ${sum}`,
          playerScore: `${this.source.playerScore} + ${sum}`,
        },
        skip: false,
      });
      // generateTable(history);//TODO:

      this.source.playerScore += sum;
      this.source.computerScore -= sum;

      this.source.playerScore =
        this.source.playerScore < 0 ? 0 : this.source.playerScore;
      this.source.computerScore =
        this.source.computerScore < 0 ? 0 : this.source.computerScore;

      // $document.querySelector('#playerScore').textContent = String(
      //   this.source.playerScore
      // );
      // $document.querySelector('#pcScore').textContent = String(
      //   this.source.computerScore
      // );
      //? deduct points from AI and give them to player
    }

    let winner =
      this.source.playerScore > this.source.computerScore ? 'You' : 'Opponent';

    setTimeout(() => {
      this.dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          type: 'message',
          message: `${winner} Won, Good Game`,
          player: `Player: ${this.source.playerScore}`,
          opponent: `Opponent: ${this.source.computerScore}`,
          buttons: ['Rematch'],
          btnCloseData: [true],
        },
      });

      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          if (!result) {
            return;
          }
          window.location.reload(); //TODO: make all data, services and components reinitialize
        });
    }, 1650);

    //in modal display:
    //  both players points
    //  declare winner
    //  offer rematch
  }

  pass(wasClicked = false, isSwap, isAI, legalClick, $document: HTMLDocument) {
    if (legalClick === false) return false;
    //if param = true ->
    //    add to passCount

    if (isSwap !== undefined) {
      this.source.history.push({
        isAI: isAI,
        score: {
          computerScore: this.source.computerScore,
          playerScore: this.source.playerScore,
        },
        skip: { isSwap: isSwap },
      });
      // generateTable(history); TODO:
    }

    if (wasClicked) {
      if (isAI) {
        this.closeDialog();
        this.dialogRef = this.dialog.open(ModalDialogComponent, {
          data: {
            type: 'message',
            message: 'Opponent chose to pass',
          },
        });
        this.closeDialog(2250);
      }
      this.source.passCount++;
    }
    //if param = false ->
    //    make sure firstTurn is set to false
    //    reset passCount to equal 0
    if (!wasClicked) {
      if (this.source.firstTurn) this.source.firstTurn = false;
      this.source.passCount = 0;
    }
    //if passCount = 4 ->
    //    end game
    if (this.source.passCount === 4) {
      this.endGame($document);
      return false;
    }
    //    allow next turn
    if (this.source.DEBUG_MODE) this.source.firstTurn = false;
    setTimeout(() => {
      this.source.playersTurn || this.source.DEBUG_MODE
        ? this.pcPlay($document)
        : (this.source.playersTurn = true); //TODO:
    }, 250);
    return false; //? remove extra style from tiles that AI played
  }

  play(isAI = false, $document: HTMLDocument) {
    if (!this.source.isValidMove.words && this.source.DEBUG_MODE) {
      this.source.playersTurn = true;
    }
    let board: Square[] = this.source.getBoard();

    if (!this.source.isValidMove.words) {
      let data: DialogData = {
        type: 'message',
        message: `${this.source.isValidMove.slice(4)}`,
        buttons: ['close'],
        btnCloseData: [false],
      };
      this.dialogRef = this.dialog.open(ModalDialogComponent, {
        data: data,
      });
      return true;
    }

    if (this.source.isValidMove.hasOwnProperty('rivalRack')) {
      this.source.computerScore += this.source.isValidMove.pointTally;
      this.source.history.push({
        isAI: true,
        word: this.source.isValidMove.wordsPlayed
          .map((x) => {
            let word = x[0].toUpperCase() + x.slice(1).toLowerCase();
            return `${word}`;
          })
          .join(', '),
        points: this.source.isValidMove.pointTally,
        score: {
          computerScore: this.source.computerScore,
          playerScore: this.source.playerScore,
        },
        skip: false,
      });
      // generateTable(history); //TODO:
      // add and display pc's score
    } else {
      this.source.playersTurn = true;
    }

    if (this.source.playersTurn && this.source.isValidMove.pointTally) {
      this.source.playerScore += this.source.isValidMove.pointTally;

      this.source.history.push({
        isAI: false,
        word: this.source.isValidMove.bestWord
          .map((x) => {
            let word = x[0].toUpperCase() + x.slice(1).toLowerCase();
            return `${word}`;
          })
          .join(', '),
        points: this.source.isValidMove.pointTally,
        score: {
          computerScore: this.source.computerScore,
          playerScore: this.source.playerScore,
        },
        skip: false,
      });
      // generateTable(history); //TODO:
      //calculate and add points to "player"
    }

    this.source.wordsLogged = this.source.isValidMove.words; //adding to the words that have been played

    if (this.source.playersTurn && !isAI) {
      let refill = $document.querySelectorAll('#board .hot').length;
      let tilesPlayed = Array.from(
        $document.querySelectorAll('#board .hot')
      ).map((el) => el.parentElement);

      let newBoard: Square[] = _.cloneDeep(board);
      //fill rack back up to 7 or what ever is left in bag
      for (let i = 0; i < refill; i++) {
        let coords: string[] = tilesPlayed[i]
          .getAttribute('data-location')
          .split(',');

        //?disable drag on "hot" tiles, remove "hot" & "multiplier" class from ".column .hot" and call pass()

        let index = +coords[0] * 15 + +coords[1];
        let data = newBoard[index].data[0];

        newBoard[index].data = [
          {
            ...data,
            class: ['tile'],
          },
        ];

        this.source.dl = this.source.dl.filter((num) => num !== index);
        this.source.dw = this.source.dw.filter((num) => num !== index);
        this.source.tl = this.source.tl.filter((num) => num !== index);
        this.source.tw = this.source.tw.filter((num) => num !== index);

        //?remove multipliers from gridMultipliers
        this.gridService.gridState.gridMultipliers[+coords[0]][+coords[1]] =
          ' ';
        this.gridService.gridState.gridLetters[+coords[0]][
          +coords[1]
        ].hot = false;

        if (this.source.bag.length) {
          // let { letter, points } = _.pullAt(this.source.bag, [0])[0];
          this.source.addToPlayerRack({
            content: _.pullAt(this.source.bag, [0])[0],
            id: `tile${++this.source.numSource}`,
            class: ['tile', 'hot'],
            'data-drag': this.source.numSource,
          });
          ++this.source.lettersUsed;
          //     $document.querySelector(`#rack`).append(`
          // <div data-drag=${++this.source.lettersUsed} class="tile hot ${
          //       points ? '' : 'blank'
          //     }">${letter}<div>${points ? points : ''}</div></div>
          // `);
          // setDraggable($(`[data-drag="${this.source.lettersUsed}"]`));//TODO:
        }
      }

      this.source.changeBoard(newBoard);

      if (
        !this.source.bag.length &&
        (!$document.querySelectorAll('#rack .tile').length ||
          !this.source.rivalRack.length)
      ) {
        return this.endGame($document);
      }

      // $document.querySelector('#bagBtn').textContent = String(
      //   100 - this.source.lettersUsed
      // );
      // resetSortable();//TODO:

      //?disable drag on "hot" tiles, remove "hot" & "multiplier" class from ".column .hot" and call pass()
      // $document.querySelectorAll('#board .hot').forEach((el) => {
      //   el.classList.remove('hot');
      //   el.parentElement.classList.remove('dw', 'tw', 'dl', 'tl');
      // }); TODO:
    } else {
      let wordUsed = this.source.isValidMove.bestWord;

      this.source.rivalRack = this.source.isValidMove.rivalRack;
      let tilesPlayed = board.filter((x) =>
        x.data[0]?.class.includes('pcPlay')
      );
      let refill = tilesPlayed.length;
      // let refill = $document.querySelectorAll('#board .pcPlay').length;
      // let tilesPlayed = Array.from(
      //   $document.querySelectorAll('#board .pcPlay')
      // ).map((el) => el.parentElement);
      //fill rack back up to 7 or what ever is left in bag
      for (let i = 0; i < refill; i++) {
        //remove multipliers from gridMultipliers
        let coords = tilesPlayed[i].data[0].coords;
        this.gridService.gridState.gridMultipliers[coords[0]][coords[1]] = ' ';
        this.gridService.gridState.gridLetters[coords[0]][
          coords[1]
        ].hot = false;

        if (this.source.bag.length) {
          this.source.rivalRack.push(_.pullAt(this.source.bag, [0])[0]);
          // console.log(this.source.rivalRack);
        }
        ++this.source.lettersUsed;
      }

      if (
        !this.source.bag.length &&
        (!$document.querySelectorAll('#rack .tile').length ||
          !this.source.rivalRack.length)
      ) {
        setTimeout(() => {
          this.closeDialog();

          let data: DialogData = {
            type: 'message',
            message: `Opponent played: "${wordUsed}"`,
          };
          this.dialogRef = this.dialog.open(ModalDialogComponent, {
            data: data,
          });
          this.closeDialog(2250);
        }, 1650);
        return this.endGame($document);
      }

      // $document.querySelector('#bagBtn').textContent = String(
      //   100 - this.source.lettersUsed
      // ); TODO:

      //disable drag on "hot" tiles, remove "hot" & "multiplier" class from ".column .hot" and call pass()
      board.forEach((x, i) => {
        if (x.data[0]?.coords) {
          this.source.dl = this.source.dl.filter((num) => num !== i);
          this.source.dw = this.source.dw.filter((num) => num !== i);
          this.source.tl = this.source.tl.filter((num) => num !== i);
          this.source.tw = this.source.tw.filter((num) => num !== i);
        }
      });

      setTimeout(() => {
        this.closeDialog();

        let data: DialogData = {
          type: 'message',
          message: `Opponent played: "${wordUsed}"`,
        };
        this.dialogRef = this.dialog.open(ModalDialogComponent, {
          data: data,
        });
        this.closeDialog(2250);
      }, 1650);
    }

    this.source.changeBoard(this.source.getBoard());
    //set firstTurn & isValidMove to false
    if (this.source.firstTurn) this.source.firstTurn = false;
    this.source.isValidMove = false;

    // $document.querySelector('#passPlay').textContent = 'Pass';
    const btnAttrs: BtnAttrs = _.cloneDeep(this.source.getBtnAttr());

    btnAttrs.passPlay.text = 'Pass';
    btnAttrs.passPlay.bgColor = '';
    btnAttrs.passPlay.icon = '';

    btnAttrs.swapRecall.text = 'Swap';
    btnAttrs.swapRecall.icon.isUndo = false;

    this.source.changeBtnAttr(btnAttrs);
    this.pass(undefined, undefined, undefined, undefined, $document);
  }
}
