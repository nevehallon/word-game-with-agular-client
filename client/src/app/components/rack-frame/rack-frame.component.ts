import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CreateGridService } from 'src/app/services/create-grid.service';
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-rack-frame',
  templateUrl: './rack-frame.component.html',
  styleUrls: ['./rack-frame.component.scss'],
})
export class RackFrameComponent implements OnInit, AfterViewInit {
  squareIds: string[] = Array(225)
    .fill('')
    .map((x, i) => x + 'square' + i);

  tiles: any[] = [];

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
      this.gridService.updateGameState(document);
    }, 0);
  }

  constructor(
    private gridService: CreateGridService,
    private gameService: GameLogicService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tiles = this.gameService.startGame(document).map((x, i) => ({
        content: x,
        id: `tile${i}`,
        class: ['tile', 'hot'],
        'data-drag': i,
      }));
    }, 0);
  }
}
