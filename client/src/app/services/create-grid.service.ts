import { Injectable, RendererFactory2 } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CreateGridService {
  $document: HTMLDocument = window.document;

  gridState;
  cleanGrid;

  cleanTheGrid($document: HTMLDocument) {
    this.gridState = this.cleanGrid;
    this.updateGameState($document);
    $document.querySelectorAll('.square').forEach((x) => (x.innerHTML = ''));
    $document.querySelector('#rack').innerHTML = '';
  }

  createGrid($document: HTMLDocument) {
    let count = 0;
    let gridLetters = [];
    let gridMultipliers = [];

    for (let i = 0; i < 15; i++) {
      gridLetters.push([]);
      gridMultipliers.push([]);
      for (let j = 0; j < 15; j++) {
        let $element = $document.querySelectorAll('.square')[count];
        // console.log($element);
        $element.setAttribute('data-location', `${i},${j}`);
        gridLetters[i].push(' ');
        // prettier-ignore
        gridMultipliers[i].push(
                  $element.classList.contains("tw") ?
                  'tw' :
                  $element.classList.contains("dw") ?
                  "dw" :
                  $element.classList.contains("tl") ?
                  "tl" :
                  $element.classList.contains("dl") ?
                  "dl" :
                  " "
              );
        ++count;
      }
    }

    return { gridLetters, gridMultipliers };
  }

  updateGameState($document: HTMLDocument) {
    this.$document = $document;
    this.gridState = this.createGrid($document);
    this.cleanGrid = _.cloneDeep(this.gridState);

    let count = 0;
    let gridLetters = [];

    for (let i = 0; i < 15; i++) {
      gridLetters.push([]);
      for (let j = 0; j < 15; j++) {
        let $element = $document.querySelectorAll('.square')[count];
        // console.log($element);
        let letter;
        if ($element.querySelector('.tile')?.innerHTML) {
          letter = $element.querySelector('.tile').textContent.slice(0, 1);
        }
        // prettier-ignore
        let hot = letter ? $element.querySelector(".tile").classList.contains("hot") : " ";
        let id = letter
          ? $element.querySelector('.tile').getAttribute('data-drag')
          : ' ';
        let pointVal = letter
          ? $element.querySelector('.tile')?.textContent.slice(1)
          : ' ';
        gridLetters[i].push(
          letter
            ? { letter, id, pointVal, hot }
            : { letter: ' ', id, pointVal, hot }
        ); //possibly remove last hot prop
        ++count;
      }
    }

    this.gridState.gridLetters = gridLetters;
  }

  constructor() {}
}
