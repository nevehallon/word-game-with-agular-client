import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { LetterToPointsService } from 'src/app/services/letter-to-points.service';
import { ScrabbleLettersService } from 'src/app/services/scrabble-letters.service';
import _ from 'lodash';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private gameService: GameLogicService,
    private letters: ScrabbleLettersService,
    private ltp: LetterToPointsService
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

    // this.value = value;

    // $('#difficulty').on('input change', function () {
    //   $('#difficultyText')
    //     .html(rangeValues[convertVal(value)].text)
    //     .attr('class', rangeValues[convertVal(value)].class);
    //   $('#difficultyPercentage')
    //     .html(((value - 15) * 100) / (65 - 15) + '%')
    //     .attr('class', rangeValues[convertVal(value)].class);
    // });
  }

  saveSettings() {
    localStorage.setItem('difficulty', this.value + '');

    localStorage.setItem('hints', `{"show": ${this.checked}}`);
  }

  ngOnInit(): void {}
}
