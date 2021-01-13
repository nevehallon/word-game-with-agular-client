import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  @Input() squareIndex: number = null;

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

  constructor() {}

  ngOnInit(): void {}
}
