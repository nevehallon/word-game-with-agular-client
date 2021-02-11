import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
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
