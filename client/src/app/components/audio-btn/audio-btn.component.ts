import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-audio-btn',
  templateUrl: './audio-btn.component.html',
  styleUrls: ['./audio-btn.component.scss'],
})
export class AudioBtnComponent implements OnInit {
  audioIcon = 'volume_mute';

  @Input() word: string = '';
  hasAudio: boolean = false;

  playAudio(el) {
    el.play();
    this.audioIcon = 'volume_down';
    let statusArr = [
      'volume_up',
      'volume_down',
      'volume_up',
      'volume_down',
      'volume_mute',
      'volume_up',
      'volume_down',
      'volume_up',
      'volume_down',
    ];

    let fourth = (el.duration * 1000) / 4;

    const numbers = interval(fourth);

    const takeFourNumbers = numbers.pipe(take(5));

    takeFourNumbers.subscribe((x) => {
      this.audioIcon = statusArr[x];
      console.log(statusArr[x], this.audioIcon);
    });
  }

  playing(el) {
    // let step = 0;
    // let statusArr = [
    //   'volume_down',
    //   'volume_up',
    //   'volume_down',
    //   'volume_up',
    //   'volume_down',
    //   'volume_up',
    //   'volume_down',
    //   'volume_up',
    //   'volume_down',
    //   'volume_up',
    //   'volume_down',
    // ];
    // let fourth = (el.duration * 1000) / 4;
    // this.interval = setInterval(() => {
    //   this.changeAudioIcon(statusArr[step++]);
    // }, 200);
  }

  end() {
    setTimeout(() => {
      this.audioIcon = 'volume_mute';
    }, 1000);
  }

  constructor() {}

  ngOnInit(): void {}
}
