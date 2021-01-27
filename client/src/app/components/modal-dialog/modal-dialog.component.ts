import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { LetterToPointsService } from 'src/app/services/letter-to-points.service';
import { ScrabbleLettersService } from 'src/app/services/scrabble-letters.service';
import _ from 'lodash';
import { MatSliderChange } from '@angular/material/slider';
import { SourceService } from 'src/app/services/source.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private gameService: GameLogicService,
    private letters: ScrabbleLettersService,
    private ltp: LetterToPointsService,
    private source: SourceService
  ) {}

  // *
  // * bag
  // *
  lettersByFreq = _.countBy(this.letters.get(), 'letter');
  letterToPointsSorted = this.ltp.get().sort((a, b) => {
    a.letter === 'BLANK' ? (a.letter = '') : a.letter;
    return b.letter > a.letter ? -1 : 1;
  });

  customizer(objValue, srcValue) {
    if (objValue) {
      return `${objValue}/${srcValue}`;
    }
    return `0/${srcValue}`;
  }

  currentFreq() {
    let currentFreq = _.countBy(this.gameService.bag, 'letter');

    _.mergeWith(currentFreq, this.lettersByFreq, this.customizer);

    return currentFreq;
  }

  // *
  // * settings
  // *
  rangeValues = {
    1: {
      text: "Easy - good if you're just starting out.",
      style: {
        display: 'block',
        'font-weight': 'bolder',
        color: 'rgb(30, 126, 52)',
      },
    },
    2: {
      text: 'Normal',
      style: { display: 'block', 'font-weight': 'bolder', color: '#0069d9' },
    },
    3: {
      text: 'Hard - you want a challenge',
      style: { display: 'block', 'font-weight': 'bolder', color: '#c82333' },
    },
    4: {
      text: 'Insane - All Gas No Breaks!!',
      style: {
        display: 'block',
        'font-weight': 'bolder',
        color: '#c82333',
        'text-decoration': 'underline',
      },
    },
  };

  hints = JSON.parse(localStorage.getItem('hints')) || { show: true };
  value = +localStorage.getItem('difficulty') || 15;
  checked = this.hints.show;
  difficultyText = this.rangeValues[`${this.convertVal(this.value)}`].text;
  difficultyStyles = this.rangeValues[`${this.convertVal(this.value)}`].style;

  convertVal(val) {
    let convertedVal = val < 28 ? 1 : val < 46 ? 2 : val < 60 ? 3 : 4;

    return convertedVal;
  }

  giveFeedBack(e: MatSliderChange) {
    let value = e.source.value;

    this.value = value;

    this.difficultyText = this.rangeValues[
      `${this.convertVal(this.value)}`
    ].text;
    this.difficultyStyles = this.rangeValues[
      `${this.convertVal(this.value)}`
    ].style;
  }

  saveSettings() {
    localStorage.setItem('difficulty', this.value + '');

    localStorage.setItem('hints', `{"show": ${this.checked}}`);
  }

  // *
  // * swap
  // *
  tiles: any[] = [];
  rackSubscription: Subscription;

  selectTile(tile) {
    if (tile.selected) return (tile.selected = false);
    tile.selected = true;
  }

  swapTiles() {
    let remainingRack = this.tiles.filter((tile) => {
      return tile.selected !== true;
    });

    let tilesToSwap = this.tiles
      .filter((tile) => {
        return tile.selected === true;
      })
      .map((tile) => {
        return { letter: tile.content.letter, points: tile.content.points };
      });

    for (let i = 0; i < tilesToSwap.length; i++) {
      if (this.gameService.bag.length) {
        let newTile = _.pullAt(this.gameService.bag, [0])[0];
        remainingRack.push({
          content: newTile,
          id: `tile${this.source.numSource}`,
          class: ['tile', 'hot'],
          'data-drag': this.source.numSource,
        });
        this.source.numSource += 1;
      }
    }

    this.gameService.bag.push(...tilesToSwap);
    this.gameService.bag = _.shuffle(_.shuffle(this.gameService.bag));

    let newRack = remainingRack;

    this.source.changePlayerRack(newRack);
  }

  // *
  // * blankOptions
  // *

  revert() {
    let originalRack = [...this.tiles, this.data.tileInfo];
    this.source.changePlayerRack(originalRack);
  }

  ngOnInit(): void {
    this.rackSubscription = this.source.currentPlayerRack.subscribe(
      (tiles) => (this.tiles = tiles)
    );
  }

  ngOnDestroy(): void {
    this.rackSubscription.unsubscribe();
  }
}
