import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss'],
})
export class RackComponent implements OnInit {
  @Input() tiles: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
