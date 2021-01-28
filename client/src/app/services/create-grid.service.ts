import { Injectable, RendererFactory2 } from '@angular/core';
import _ from 'lodash';
import { Square } from '../interfaces/square';
import { SourceService } from './source.service';

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
        // $element.setAttribute('data-location', `${i},${j}`);
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
    let board = this.source.getBoard();

    this.$document = $document;
    this.gridState = this.createGrid($document);
    this.cleanGrid = _.cloneDeep(this.gridState);

    let count = 0;
    let gridLetters = [];

    for (let i = 0; i < 15; i++) {
      gridLetters.push([]);
      for (let j = 0; j < 15; j++) {
        let $element = $document.querySelectorAll('.square')[count];

        let square: Square = board[count];
        let squareRef = square.data[0];
        // console.log($element);
        let letter;
        if (squareRef) {
          letter = squareRef.content.letter;
        }
        // prettier-ignore
        let hot = letter ? squareRef.class.includes("hot") : " ";
        let id = letter
          ? $element.querySelector('.tile').getAttribute('data-drag')
          : ' ';
        let pointVal = letter ? squareRef.content.points : ' ';
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

  constructor(private source: SourceService) {}
}
