import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  @Input() element;

  // @ViewChild(MatTabGroup) group;
  // @ViewChildren(MatTab) tabs;
  tabCount = 0;
  selectedTab = 0;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  number_tabs;
  swipe(eType, tabCount) {
    if (!tabCount) return;
    this.tabCount = tabCount;
    // console.log(eType, tabCount, this.selectedTab);
    if (eType === this.SWIPE_ACTION.LEFT && this.selectedTab < tabCount - 1) {
      // console.log('movin right');
      this.selectedTab++;
    } else if (
      eType === this.SWIPE_ACTION.RIGHT &&
      this.selectedTab > 0 /* this.tabCount */
    ) {
      // console.log('movin left ');
      this.selectedTab--;
    }
    // console.log(this.selectedTab);
  }
}
