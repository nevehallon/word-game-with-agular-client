import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rack-frame',
  templateUrl: './rack-frame.component.html',
  styleUrls: ['./rack-frame.component.scss'],
})
export class RackFrameComponent implements OnInit {
  tiles: any[] = [0, 1, 2, 3, 4, 5, 6];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
  }

  constructor() {}

  ngOnInit(): void {}
}
