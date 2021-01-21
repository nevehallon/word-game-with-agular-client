import { Injectable } from '@angular/core';
import { Trie } from '../../assets/trie-prefix-tree/index.js';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BoardValidatorService {
  zip(arrays) {
    return arrays[0].map((_, i) => arrays.map((array) => array[i]));
  }

  rowWordStack = [];
  columnWordStack = [];
  potentialPoints = [];
  wordMultiplier = [];
  potentialZipPoints = [];
  zipWordMultiplier = [];

  push2(point, multi, index) {
    this.potentialPoints[index].push(point);
    this.wordMultiplier[index].push(multi);
  }

  push2Zip(point, multi, index) {
    this.potentialZipPoints[index].push(point);
    this.zipWordMultiplier[index].push(multi);
  }

  isHot($document: HTMLDocument) {
    $document.querySelector('#passPlay').textContent = 'Play';

    $document
      .querySelector('#passPlay')
      .setAttribute('class', 'btn btn-primary');

    $document.querySelector('#swapRecall').innerHTML =
      '<svg data-src="https://s.svgbox.net/materialui.svg?ic=undo" width="25" height="25" fill="currentColor"></svg> Recall';
  }

  isNot($document: HTMLDocument) {
    $document.querySelector('#passPlay').textContent = 'Pass';

    $document
      .querySelector('#passPlay')
      .setAttribute('class', 'btn btn-primary');

    $document.querySelector('#swapRecall').innerHTML =
      '<svg data-src="https://s.svgbox.net/materialui.svg?ic=swap_vertical_circle" width="25" height="25" fill="currentColor"></svg> Swap';
  }

  playError($document: HTMLDocument) {
    setTimeout(() => {
      if ($document.querySelector('#passPlay').textContent === 'Pass') return;
      $document.querySelector('#passPlay').innerHTML =
        "<svg data-src='https://s.svgbox.net/materialui.svg?ic=block' width='25' height='25' fill='currentColor'></svg> Play";
      $document
        .querySelector('#passPlay')
        .setAttribute('class', 'btn btn-danger');
    }, 0);
  }

  validate(
    gridState,
    firstTurn,
    wordsLogged,
    isPlayer,
    $document: HTMLDocument
  ) {
    let { gridLetters: board, gridMultipliers: multiplierMatrix } = gridState;
    try {
      let hasWords = true;

      !$document.querySelectorAll('.column .hot').length
        ? this.isNot($document)
        : this.isHot($document);
      if (isPlayer) {
        if (firstTurn && !board[7][7].letter.trim()) {
          if (!$document.querySelectorAll('#board .hot').length)
            return this.isNot($document);
          this.playError($document);
          throw '(45) Your word must touch an existing word or the center star';
        }

        let hotPivot;
        let hotCompare;
        let hotArr = $document.querySelectorAll('#board .hot');
        if (hotArr.length > 1) {
          hotArr.forEach((tile, index) => {
            hotCompare = tile.parentElement
              .getAttribute('data-location')
              .split(',');

            if (index === 0)
              hotPivot = tile.parentElement
                .getAttribute('data-location')
                .split(',');

            if (
              hotCompare[0] !== hotPivot[0] &&
              hotCompare[1] !== hotPivot[1]
            ) {
              if (!$document.querySelectorAll('#board .hot').length)
                return this.isNot($document);
              this.playError($document);
              throw '(59) The letters you play must lie on the same row or column, and must be connected to each other';
            }
          });
        }
      }

      let letter = board.map((row) => row.map((obj) => obj.letter));
      let id = board.map((row) => row.map((obj) => obj.id));
      let hot = board.map((row) => row.map((obj) => obj.hot));
      let pointVal = board.map((row) => row.map((obj) => obj.pointVal));
      let multiplier = multiplierMatrix;

      let fullMatrix = {
        letterRows: letter,
        idRows: id,
        hotRows: hot,
        pointValRows: pointVal,
        multiplierRows: multiplier,
      };

      let fullMatrixZip = {
        letterColumns: this.zip(letter),
        idColumns: this.zip(id),
        hotColumns: this.zip(hot),
        pointValColumns: this.zip(pointVal),
        multiplierColumns: this.zip(multiplier),
      };

      let {
        letterRows,
        idRows,
        hotRows,
        pointValRows,
        multiplierRows,
      } = fullMatrix;
      let {
        letterColumns,
        idColumns,
        hotColumns,
        pointValColumns,
        multiplierColumns,
      } = fullMatrixZip;

      letterRows = letterRows.map((row) => row.join(''));
      letterColumns = letterColumns.map((column) => column.join(''));

      // idRows = idRows.map((row) => row.join(""));
      // idColumns = idColumns.map((column) => column.join(""));

      hotRows = hotRows.map((row) => row.join(''));
      hotColumns = hotColumns.map((column) => column.join(''));

      multiplierRows = multiplierRows.map((row) => row.join(''));
      multiplierColumns = multiplierColumns.map((column) => column.join(''));

      pointValRows = pointValRows.map((row) => row.join(''));
      pointValColumns = pointValColumns.map((column) => column.join(''));

      let words = [];
      let ids = [];
      let hotLetters = [];

      [...letterRows, ...letterColumns].map((line) =>
        line.split(' ').map((word) => {
          if (word.length > 1) return words.push(word);
        })
      );

      if (isPlayer) {
        let suspectId = [];
        [...idRows, ...idColumns].map((line) =>
          line.map((id, index) => {
            if (id === ' ') return;
            let prev =
              line[index - 1] === ' ' || line[index - 1] === undefined
                ? true
                : false;
            let next =
              line[index + 1] === ' ' || line[index + 1] === undefined
                ? true
                : false;
            if (
              suspectId.includes(id) &&
              id !== board[7][7].id.trim() &&
              prev &&
              next
            ) {
              if (!$document.querySelectorAll('#board .hot').length)
                return this.isNot($document);
              this.playError($document);
              throw '(37) The letters you play must lie on the same row or column, and must be connected to each other';
            }
            //prettier-ignore
            !suspectId.includes(id) && 
          prev && 
          next ? 
          suspectId.push(id) : undefined;

            if (id.length > 0) return ids.push(id);
          })
        );

        if (ids.length == 2) {
          if (!$document.querySelectorAll('#board .hot').length)
            return this.isNot($document);
          this.playError($document);
          throw `138) Word must contain at least two letters`;
        }
      }
      let touching = false;
      let singleHot = 0;
      [...hotRows, ...hotColumns].map((line, index) =>
        line.split(' ').map((bool) => {
          if (bool === 'true' && index < 15) singleHot = 1;
          if (bool === 'true' && index >= 15)
            singleHot ? singleHot++ : undefined;
          if (bool.includes('falsetrue') || bool.includes('truefalse'))
            touching = true;
          if (_.without(hotLetters, '', 'true').length > 1) {
            if (isPlayer) {
              if (!$document.querySelectorAll('#board .hot').length)
                return this.isNot($document);
              this.playError($document);
              throw '(47) The letters you play must lie on the same row or column, and must be connected to each other';
            } else {
              // console.log({
              //   message: "AI error happened",
              //   board: { letters: fullMatrix.letterRows, hot: fullMatrix.hotRows },
              // });
              hasWords = false;
            }
          }
          if (bool.length > 7)
            return hotLetters.push(bool.replaceAll('false', ''));
        })
      );

      if ((!touching && !firstTurn) || singleHot > 1) {
        if (isPlayer) {
          if (!$document.querySelectorAll('#board .hot').length)
            return this.isNot($document);
          this.playError($document);
          throw '(48) The letters you play must lie on the same row or column, and must be connected to each other';
        } else {
          // console.log({
          //   message: "AI error happened",
          //   board: { letters: fullMatrix.letterRows, hot: fullMatrix.hotRows },
          // });
          hasWords = false;
        }
      }

      this.rowWordStack = [];
      this.columnWordStack = [];
      this.potentialPoints = [];
      this.wordMultiplier = [];
      this.potentialZipPoints = [];
      this.zipWordMultiplier = [];
      let coords = [];
      let zipCoords = [];
      let done = false;

      fullMatrix.hotRows.forEach((row, rowIndex) => {
        if (_.without(row, ' ').length > 1 && row.includes(true)) {
          row.forEach((cell, index) => {
            if (done) return;
            let prev =
              row[index - 1] === undefined || row[index - 1] === ' '
                ? true
                : false;
            let next =
              row[index + 1] === undefined || row[index + 1] === ' '
                ? true
                : false;
            let skip = !_.drop(row, index + 1).includes(true);
            if (cell !== ' ') {
              if (prev && !skip) coords = [];
              if (cell === true && prev) {
                coords = [];
                if (!skip && prev && next && isPlayer) {
                  if (!$document.querySelectorAll('#board .hot').length)
                    return this.isNot($document);
                  this.playError($document);
                  throw '(51) The letters you play must lie on the same row or column, and must be connected to each other';
                }
                if (prev && next) return (done = true);
              }
              if (prev && next) return;
              if (next && skip) done = true;
              coords.push([rowIndex, index]);
            }
          });
          done = false;
          if (coords.length > 1) {
            this.rowWordStack.push(coords);
            coords = [];
          }
        }
      });

      fullMatrixZip.hotColumns.forEach((column, columnIndex) => {
        if (_.without(column, ' ').length > 1 && column.includes(true)) {
          column.forEach((cell, index) => {
            if (done) return;
            let prev =
              column[index - 1] === undefined || column[index - 1] === ' '
                ? true
                : false;
            let next =
              column[index + 1] === undefined || column[index + 1] === ' '
                ? true
                : false;
            let skip = !_.drop(column, index + 1).includes(true);
            if (cell !== ' ') {
              if (prev && !skip) zipCoords = [];
              if (cell === true && prev) {
                zipCoords = [];
                if (!skip && prev && next && isPlayer) {
                  if (!$document.querySelectorAll('#board .hot').length)
                    return this.isNot($document);
                  this.playError($document);
                  throw '(52) The letters you play must lie on the same row or column, and must be connected to each other';
                }
                if (prev && next) return (done = true);
              }
              if (prev && next) return;
              if (next && skip) done = true;
              zipCoords.push([columnIndex, index]);
            }
          });
          done = false;
          if (zipCoords.length > 1) {
            this.columnWordStack.push(zipCoords);
            zipCoords = [];
          }
        }
      });

      //prettier-ignore
      this.rowWordStack.forEach((coords, index) => {
        this.potentialPoints.push([]);
        this.wordMultiplier.push([]);
        coords.forEach(coord => {
          let point = +fullMatrix.pointValRows[coord[0]][coord[1]];
          let multiplier = fullMatrix.multiplierRows[coord[0]][coord[1]];
          multiplier === " " ? this.potentialPoints[index].push(point) : 
          multiplier === "dl" ? this.potentialPoints[index].push(point * 2) :
          multiplier === "tl" ? this.potentialPoints[index].push(point * 3) :
          multiplier === "dw" ? this.push2(point, 2, index) :
          multiplier === "tw" ? this.push2(point, 3, index) : "";
        });
      });

      //prettier-ignore
      this.columnWordStack.forEach((zipCoords, index) => {
        this.potentialZipPoints.push([]);
        this.zipWordMultiplier.push([]);
        zipCoords.forEach(coord => {
          let point = +fullMatrixZip.pointValColumns[coord[0]][coord[1]];
          let multiplier = fullMatrixZip.multiplierColumns[coord[0]][coord[1]];
          multiplier === " " ? this.potentialZipPoints[index].push(point) : 
          multiplier === "dl" ? this.potentialZipPoints[index].push(point * 2) :
          multiplier === "tl" ? this.potentialZipPoints[index].push(point * 3) :
          multiplier === "dw" ? this.push2Zip(point, 2, index) :
          multiplier === "tw" ? this.push2Zip(point, 3, index) : "";
        });
      });

      let numHot = _.without(hotLetters, '').length
        ? _.without(hotLetters, '').sort().reverse()[0].length / 4
        : 0;
      if (isPlayer) {
        // console.log(hotLetters);
        if (
          _.without(hotLetters, '').length >
          this.potentialPoints.length + this.potentialZipPoints.length
        ) {
          if (!$document.querySelectorAll('#board .hot').length)
            return this.isNot($document);
          this.playError($document);
          throw '(57) The letters you play must lie on the same row or column, and must be connected to each other';
        }
      }

      _.without(words, ...wordsLogged).forEach((word) => {
        if (!Trie().hasWord(word)) {
          if (isPlayer) {
            if (!$document.querySelectorAll('#board .hot').length)
              return this.isNot($document);
            this.playError($document);
            throw `290) The word: '${word}' is INVALID `;
          } else {
            hasWords = false;
          }
        }
        //check words validity
      }); // passing in everything but words that have already been played to make sure we are only checking new words ->faster Trie check

      let pointTally = [];

      this.potentialPoints.forEach((word, index) => {
        let isEmpty =
          this.wordMultiplier[index] === undefined ||
          this.wordMultiplier[index] == 0
            ? true
            : false;
        if (numHot > 6 && isPlayer) pointTally.push(50);
        if (isEmpty) return pointTally.push(_.sum(word));
        pointTally.push(_.sum(word) * _.sum(this.wordMultiplier[index]));
      });

      this.potentialZipPoints.forEach((word, index) => {
        let isEmpty =
          this.zipWordMultiplier[index] === undefined ||
          this.zipWordMultiplier[index] == 0
            ? true
            : false;
        if (numHot > 6 && isPlayer) pointTally.push(50);
        if (isEmpty) return pointTally.push(_.sum(word));
        pointTally.push(_.sum(word) * _.sum(this.zipWordMultiplier[index]));
      });

      pointTally = _.sum(pointTally);

      if (isPlayer) {
        !$document.querySelectorAll('.square .hot').length
          ? this.isNot($document)
          : ($document.querySelector(
              '#passPlay'
            ).textContent = `Play ${pointTally}`);
      }

      if (hasWords) {
        return {
          words,
          pointTally,
          bestWord: _.without(words, ...wordsLogged),
        }; //return wordsToBeLogged, totalPotentialPoints
      } else {
        return { words, pointTally: 0 };
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  constructor() {}
}
