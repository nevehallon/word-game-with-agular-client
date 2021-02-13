import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {
  HistoryEntry,
  DefinitionElement,
} from 'src/app/interfaces/history-entry';
import { SourceService } from 'src/app/services/source.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent implements OnInit, AfterViewInit {
  constructor(private source: SourceService) {}

  @ViewChildren('td') td: QueryList<ElementRef>;

  firstTurn = this.source.firstTurn;
  gameOver = this.source.gameOver;

  dataSource: HistoryEntry[] = this.source.history;
  // dataSource: HistoryEntry[] = def; //? mock data for testing located in mockHistoryEntries.ts
  displayedColumns = ['move', 'opponent', 'player'];

  lastEntry: any = this.source.history[this.source.history.length - 1];
  // lastEntry: any = def[def.length - 1]; //? mock data for testing located in mockHistoryEntries.ts

  log(...rest) {
    console.log(...rest);
  }

  expandedElement:
    | DefinitionElement[]
    | null; /* = this.source.history.map(
    (x) => x.definitions
  ) */

  isExpansionDetailRow = (i: number, row: any) => {
    if (i == 0)
      console.log(this.source.history, this.dataSource, this.lastEntry); //!change to no def and return false

    if (!row.points) return false;
    return true;
  };

  scrollInView(el: HTMLElement, el2: HTMLElement) {
    // clearTimeout(this.timer);

    // console.log(this.lastEntry, this.source.history);

    setTimeout(() => {
      // console.log('start'); TODO: limit the amount of calls

      el.scrollTo({
        top: el2.offsetTop - (el2.offsetHeight - 125),
        behavior: 'smooth',
      });
    }, 225);

    return 'expanded';
  }

  @ViewChild(MatTabGroup) group;
  @ViewChildren(MatTab) tabs;
  tabCount = 0;
  selectedTab = 0;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  number_tabs;
  // ngAfterViewInit(){
  //   this.tab_num = this.tabs.length
  //   console.log(this.group)
  // }
  swipe(eType, tabCount) {
    this.tabCount = tabCount;
    console.log(eType);
    if (eType === this.SWIPE_ACTION.LEFT && this.selectedTab > 0) {
      console.log('movin left');
      this.selectedTab--;
    } else if (
      eType === this.SWIPE_ACTION.RIGHT &&
      this.selectedTab < this.tabCount
    ) {
      console.log('movin right');
      this.selectedTab++;
    }
    console.log(this.selectedTab);
  }

  // swipeCoord;
  // swipeTime;

  // swipe(e: TouchEvent, when: string, tabCount): void {
  //   if (tabCount) this.tabCount = tabCount;
  //   // console.log(tabCount);

  //   const coord: [number, number] = [
  //     e.changedTouches[0].clientX,
  //     e.changedTouches[0].clientY,
  //   ];
  //   const time = new Date().getTime();
  //   if (when === 'start') {
  //     this.swipeCoord = coord;
  //     this.swipeTime = time;
  //   } else if (when === 'end') {
  //     const direction = [
  //       coord[0] - this.swipeCoord[0],
  //       coord[1] - this.swipeCoord[1],
  //     ];
  //     const duration = time - this.swipeTime;
  //     if (
  //       duration < 1000 && //
  //       Math.abs(direction[0]) > 30 && // Long enough
  //       Math.abs(direction[0]) > Math.abs(direction[1] * 3)
  //     ) {
  //       // Horizontal enough
  //       const swipe = direction[0] < 0 ? 'next' : 'previous';
  //       // console.info(swipe);
  //       if (swipe === 'next') {
  //         if (this.selectedTab <= this.tabCount - 2) {
  //           this.selectedTab = this.selectedTab + 1;
  //         }
  //         // console.log('Swipe left — INDEX: ' + this.selectedTab);
  //       } else if (swipe === 'previous') {
  //         const isLast = this.selectedTab === this.tabCount - 1;
  //         if (this.selectedTab >= 1) {
  //           this.selectedTab = this.selectedTab - 1;
  //         }
  //         // console.log('Swipe right — INDEX: ' + this.selectedTab);
  //       }
  //       // Do whatever you want with swipe
  //     }
  //   }
  // }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let el = this.td.toArray()[this.dataSource.length - 2]?.nativeElement;
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }
}
