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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  squares: any[] = Array(225)
    .fill('')
    .map((x, i) => ({ data: [] }));

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
    setTimeout(() => {
      this.gameLogic.isValidMove = false;
      this.gridService.updateGameState(document);
      this.gameLogic.isValidMove = this.validate.validate(
        this.gridService.gridState,
        this.gameLogic.firstTurn,
        this.gameLogic.wordsLogged,
        true,
        document
      );

      console.log(this.gridService.gridState);
    }, 0);
  }

  onlyOneTile(item: CdkDrag, list: CdkDropList) {
    if (list.data.length === 1) return false;
    return true;
  }

  constructor(
    private gridService: CreateGridService,
    private gameLogic: GameLogicService,
    private source: SourceService,
    private validate: BoardValidatorService
  ) {
    validate.init(this.source);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gridService.updateGameState(document);
  }
}
