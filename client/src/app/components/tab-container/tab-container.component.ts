import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  @Input() element;
  tabCount = 0;
  selectedTab = 0;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  number_tabs;
  swipe(eType, tabCount) {
    if (!tabCount) return;
    this.tabCount = tabCount;
    // console.log(eType, tabCount, this.selectedTab);
    if (eType === this.SWIPE_ACTION.LEFT && this.selectedTab < tabCount - 1) {
      this.selectedTab++;
    } else if (eType === this.SWIPE_ACTION.RIGHT && this.selectedTab > 0) {
      this.selectedTab--;
    }
  }
}
