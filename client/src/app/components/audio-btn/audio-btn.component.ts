import { Component, Input, OnInit } from '@angular/core';
// import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faVolumeOff,
  faVolumeDown,
  faVolumeUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-audio-btn',
  templateUrl: './audio-btn.component.html',
  styleUrls: ['./audio-btn.component.scss'],
})
export class AudioBtnComponent implements OnInit {
  faVolumeOff = true;
  faVolumeDown = false /* faVolumeDown */;
  faVolumeUp = false /* faVolumeUp */;
  faVolumeOffIcon = faVolumeOff;
  faVolumeDownIcon = faVolumeDown;
  faVolumeUpIcon = faVolumeUp;
  // iconComponent: FaIconComponent;

  @Input() word: string = '';
  hasAudio: boolean = false;

  playAudio(el, iconComponent) {
    // this.iconComponent = iconComponent;
    el.play();
    // this.faVolume = faVolumeDown;
    let statusArr = [
      'faVolumeUp',
      'faVolumeDown',
      'faVolumeUp',
      'faVolumeDown',
      'faVolumeUp',
      'faVolumeDown',
    ];

    let fourth = (el.duration * 1000) / 4;

    const numbers = interval(fourth);

    const takeFourNumbers = numbers.pipe(take(5));

    takeFourNumbers.subscribe((x) => {
      this.faVolumeOff = false;
      this.faVolumeDown = false;
      this.faVolumeUp = false;
      this[statusArr[x]] = true;
      // this.faVolume = statusArr[x];
      // this.iconComponent.icon = statusArr[x];
      // this.iconComponent.render();
      // console.log(statusArr[x], this.faVolume);
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
      // this.faVolume = faVolumeOff;
      // this.iconComponent.icon = faVolumeOff;
      // this.iconComponent.render();
    }, 500);
  }

  constructor() {}

  ngOnInit(): void {}
}
