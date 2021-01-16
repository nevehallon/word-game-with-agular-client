import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rack-frame',
  templateUrl: './rack-frame.component.html',
  styleUrls: ['./rack-frame.component.scss'],
})
export class RackFrameComponent implements OnInit {
  squareIds: string[] = Array(225)
    .fill('')
    .map((x, i) => x + 'square' + i);

  tiles: any[] = Array(7)
    .fill('')
    .map((x, i) => ({
      content: i,
      id: `tile${i}`,
      class: ['tile'],
    }));

  drop(event: CdkDragDrop<string[]>) {
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
  }

  constructor() {}

  ngOnInit(): void {}
}
