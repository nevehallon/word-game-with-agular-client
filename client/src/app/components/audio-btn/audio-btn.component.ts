import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-btn',
  templateUrl: './audio-btn.component.html',
  styleUrls: ['./audio-btn.component.scss'],
})
export class AudioBtnComponent implements OnInit {
  hasAudio: boolean = false;

  flip = true;
  statusIcon: string = 'volume_mute';

  @Input() word: string = null;

  playAudio(el) {
    el.play();
  }

  interval;

  playing(el) {
    let step = 0;
    let statusArr = ['volume_down', 'volume_up', 'volume_down'];
    let fourth = (el.duration * 1000) / 4;
    this.interval = setInterval(() => {
      this.flip = !this.flip;
      this.statusIcon = statusArr[step++];
      this.flip = !this.flip;
    }, fourth);
  }

  end() {
    clearInterval(this.interval);
    this.flip = !this.flip;

    this.statusIcon = 'volume_mute';
    this.flip = !this.flip;
  }

  constructor() {}

  ngOnInit(): void {}
}
