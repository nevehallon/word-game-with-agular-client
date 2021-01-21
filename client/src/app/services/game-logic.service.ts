import { Injectable } from '@angular/core';
import { ScrabbleLettersService } from './scrabble-letters.service';
import _ from 'lodash';
import { GetRequestsService } from './get-requests.service';
import { ComputeService } from './compute.service';
import { CreateGridService } from './create-grid.service';
@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  constructor(
    private letters: ScrabbleLettersService,
    private http: GetRequestsService,
    private calc: ComputeService,
    private gridService: CreateGridService
  ) {}

  DEBUG_MODE = false; //? change to true for the AI to play it self

  loaderShown = false;
  playerScore = 0;
  computerScore = 0;
  lettersUsed = 0;
  passCount = 0;
  isZoomed = false;
  fired = false;
  overRack = false;
  firstTurn = true;
  isValidMove: boolean | Object = false;
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

  zoomIn(elm) {
    if (!this.isZoomed) {
      // $("#board").css({
      //   height: "705px",
      //   width: "unset",
      //   "max-width": "unset",
      //   "grid-template-columns": "repeat(15, 52px)",
      //   "grid-template-rows": "repeat(15, 57px)",
      //   "justify-content": "safe center",
      //   margin: "0",
      // });
      // bigTile($("#board .tile"));
      // isZoomed = true;
      // if (elm) {
      //   // $("body").addClass("stop-scrolling");
      //   elm.scrollIntoView({ block: "center", inline: "center" });
      //   setTimeout(() => {
      //     // $("body").removeClass("stop-scrolling");
      //   }, 500);
      // }
    }
  }

  zoomOut() {
    if (!this.isZoomed) return;
    // $("#board").css({
    //   height: "412.5px",
    //   width: "400px",
    //   "max-width": "400px",
    //   "grid-template-columns": "repeat(15, 27.5px)",
    //   "grid-template-rows": "repeat(15, 27.5px)",
    //   "justify-content": "center",
    //   margin: "0 auto",
    // });
    // smallTile($("#board .tile"));
    this.isZoomed = false;
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

  pcSwap() {
    //? .sort((a,b) => b > a ? -1 : 1).filter(x => x !== 0) //for sorting by point value and removing blank tiles
    let numTilesLeftInBag = this.bag.slice(0, 7).length;
    let tilesLeftInRivalRack = this.rivalRack.slice(0, 7);
    let numTilesLeftInRivalRack = this.rivalRack.slice(0, 7).length;

    let bool = numTilesLeftInBag <= numTilesLeftInRivalRack;
    let maxNumTilesToSwap = bool ? numTilesLeftInBag : numTilesLeftInRivalRack;

    this.rivalRack = bool
      ? this.rivalRack.slice(0, 7 - maxNumTilesToSwap)
      : this.rivalRack.slice(7 - maxNumTilesToSwap);

    for (let i = 0; i < maxNumTilesToSwap; i++) {
      if (this.bag.length) {
        this.rivalRack.push(_.pullAt(this.bag, [0])[0]);
      }
    }

    this.bag.push(...tilesLeftInRivalRack.slice(0, maxNumTilesToSwap));
    this.bag = _.shuffle(_.shuffle(this.bag));
    console.log(this.rivalRack, this.bag);
    this.passCount = -1;
    this.pass(true, true, true);

    // toggleModal({
    //   executeClose: true,
    // });
    // toggleModal({
    //   modal: { class: "", content: "" },
    //   modalPlacer: { class: "modal-dialog-centered", content: "" },
    //   title: { class: "", content: "Opponent chose to swap tiles" },
    //   body: { class: "d-none", content: "" },
    //   footer: { class: "d-none", content: "" },
    //   actionButton: { class: "", content: "" },
    //   timeout: 2250,
    //   executeClose: false,
    // });
  }

  pcPlay($document: HTMLDocument) {
    // toggleModal({
    //   modal: { class: "", content: "" },
    //   modalPlacer: { class: "modal-dialog-centered", content: "" },
    //   title: { class: "", content: "Opponent is thinking..." },
    //   body: {
    //     class: "text-center",
    //     content: `<div class="spinner-container my-2"><svg class="spinner" data-src="https://s.svgbox.net/loaders.svg?ic=circles" fill="currentColor"></svg></div>`,
    //   },
    //   footer: { class: "d-none", content: "" },
    //   actionButton: { class: "", content: "" },
    //   timeout: 0,
    //   executeClose: false,
    // });
    this.playersTurn = false;

    // if (rivalRack.length < 7 && !bag.length && prompt()) {
    //   rivalRack = Array(7).fill({ letter: "Q", points: 10 });
    // }
    // rivalRack = Array(7).fill({ letter: "Q", points: 10 }); //[...rivalRack.slice(0, 6), { letter: "", points: 0 }]; //? uncomment for testing

    this.zoomOut();
    this.rivalRack.sort((a, b) => (b.letter ? 1 : -1)); //make sure that blanks are last tile
    setTimeout(async () => {
      try {
        this.isValidMove = await this.calc.calcPcMove(
          this.gridService.gridState,
          this.firstTurn,
          this.wordsLogged,
          this.rivalRack,
          $document
        );
        // prettier-ignore
        !this.isValidMove && this.rivalRack.length && this.bag.length ? 
        this.pcSwap() : this.isValidMove ? 
        this.play(true) : this.DEBUG_MODE ? 
        false : this.pass(true, false, true);
      } catch (error) {
        if (error?.message?.includes('ranch')) {
          return console.error(error);
        }

        console.error(error);
        this.pcPlay($document);
      }
    }, 50);
  }

  endGame($document: HTMLDocument) {
    this.zoomOut();
    $document.querySelector('#startGame')[0].removeAttribute('disabled');
    $document.querySelector<HTMLElement>('#startGame').style.display =
      'inherit';
    $document
      .querySelectorAll<HTMLElement>(
        '#actionBar .btn:not(#scoresBtn, #startGame)'
      )
      .forEach((el) =>
        Object.assign(el.style, { 'pointer-events': 'none', display: 'none' })
      ); //?prevent players from continuing (can still see the score history, and shows a button for a rematch)

    $document.querySelectorAll<HTMLElement>('#board .hot').forEach((el) => {
      el.classList.remove('hot');
      el.parentElement.classList.remove('dw', 'tw', 'dl', 'tl');
    });

    //?remove hot tiles from board

    if (!this.rivalRack.length) {
      let sum = Array.from(
        $document.querySelectorAll('#rack .tile div')
      ).reduce((acc, cur) => acc + +cur.innerHTML, 0);

      this.history.push({
        isAI: true,
        word: 'Opponent Won',
        points: '',
        score: {
          computerScore: `${this.computerScore} + ${sum}`,
          playerScore: `${this.playerScore} - ${sum}`,
        },
        skip: false,
      });
      // generateTable(history);//TODO:

      this.playerScore -= sum;
      this.computerScore += sum;

      this.playerScore = this.playerScore < 0 ? 0 : this.playerScore;
      this.computerScore = this.computerScore < 0 ? 0 : this.computerScore;
      $document.querySelector('#playerScore').textContent = String(
        this.playerScore
      );
      $document.querySelector('#pcScore').textContent = String(
        this.computerScore
      );
      //? deduct points from player and give them to AI
    }

    if (!$document.querySelectorAll('#rack .tile').length) {
      let sum = this.rivalRack.reduce((acc, cur) => acc + cur, 0);

      history.push({
        isAI: false,
        word: 'Player Won',
        points: '',
        score: {
          computerScore: `${this.computerScore} - ${sum}`,
          playerScore: `${this.playerScore} + ${sum}`,
        },
        skip: false,
      });
      // generateTable(history);//TODO:

      this.playerScore += sum;
      this.computerScore -= sum;

      this.playerScore = this.playerScore < 0 ? 0 : this.playerScore;
      this.computerScore = this.computerScore < 0 ? 0 : this.computerScore;

      $document.querySelector('#playerScore').textContent = String(
        this.playerScore
      );
      $document.querySelector('#pcScore').textContent = String(
        this.computerScore
      );
      //? deduct points from AI and give them to player
    }

    let winner = this.playerScore > this.computerScore ? 'You' : 'Opponent';

    setTimeout(() => {
      // toggleModal({
      //   modal: { class: "text-center", content: "" },
      //   modalPlacer: { class: "modal-dialog-centered", content: "" },
      //   modalHeader: { class: "d-none", content: `` },
      //   body: {
      //     class: "",
      //     content: `<h4 class="mb-2">${winner} Won, Good Game</h4><div class="text-primary font-weight-bold">Player: ${playerScore}</div><div class="text-danger font-weight-bold">Opponent: ${computerScore}</div>`,
      //   },
      //   footer: { class: "", content: "" },
      //   actionButton: { class: "rematch", content: "Rematch" },
      //   timeout: 0,
      //   executeClose: false,
      // });
      // $(".rematch").click(rematch);
    }, 1650);

    //in modal display:
    //  both players points
    //  declare winner
    //  offer rematch
  }

  swap($document: HTMLDocument, bag) {
    // toggleModal({
    //   modal: { class: "text-center", content: "" },
    //   modalPlacer: { class: "modal-dialog-centered", content: "" },
    //   modalHeader: { class: "d-none", content: "" },
    //   body: {
    //     class: "mh-100",
    //     content:
    //       ($("#rack .tile").length > bag.length
    //         ? `<div class="alert alert-danger" role="alert">You can only swap up to ${bag.length} tile(s)</div>`
    //         : ``) + generateRack($("#rack").children(".tile").toArray()),
    //   },
    //   footer: { class: "justify-content-center", content: "" },
    //   actionButton: { class: "executeSwap", content: "Confirm" },
    //   timeout: 0,
    //   executeClose: false,
    // });
    $document.querySelectorAll<HTMLElement>('.selectTile').forEach((el) => {
      el.addEventListener('click', function () {
        let under = $document.querySelectorAll('.selected').length < bag.length;
        if (under || this.classList.contains('selected')) {
          this.classList.toggle('selected');
        }
      });
    });
    //show player's letters and ask which letters to swap
    //->if cancel
    //    close modal and return
    //->if confirm
    //    remove chosen letters
    //    pick new letters in exchange and place them on player's rack
    //    take chosen letters and insert in to bag
    $('.executeSwap')
      .off('click')
      .click((e) => {
        if (!$('.selected').length) return;
        let { newBag, newRack } = doSwap(bag, $('.selectTile').toArray());
        bag = newBag;
        $(`#rack`).empty();
        newRack.forEach((x) => {
          $(`#rack`).append(`
        <div data-drag=${x.drag} class="tile hot ${x.points ? '' : 'blank'}">${
            x.letter
          }<div>${x.points ? x.points : ''}</div></div>
        `);
          setDraggable($(`[data-drag="${x.drag}"]`));
          e.stopImmediatePropagation();
        });

        passCount = -1;
        pass(true, true, false);
      });
  }
}
