import {
  AfterViewInit,
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

import { HistoryEntry } from 'src/app/interfaces/history-entry';
import { SourceService } from 'src/app/services/source.service';
import { DefinitionElement } from 'src/app/interfaces/definition-element';

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
})
export class HistoryTableComponent implements OnInit, AfterViewInit {
  constructor(private source: SourceService) {}

  @ViewChildren('td') td: QueryList<ElementRef>;

  firstTurn = this.source.firstTurn;
  gameOver = this.source.gameOver;

  dataSource: HistoryEntry[] = this.source.history.slice(0, -1);
  displayedColumns = ['move', 'opponent', 'player'];

  lastEntry: any = this.source.history[this.source.history.length - 1];
  log(expandedElement, element) {
    console.log(expandedElement, element);
  }
  expandedElement:
    | DefinitionElement[]
    | null; /* = this.source.history.map(
    (x) => x.definitions
  ) */

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let el = this.td.last?.nativeElement;
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }
}

let def = [
  {
    definition: 'speech you make to yourself',
    partOfSpeech: 'noun',
    synonyms: ['monologue'],
    typeOf: [
      'speech',
      'voice communication',
      'speech communication',
      'spoken communication',
      'spoken language',
      'language',
      'oral communication',
    ],
    derivation: ['soliloquize'],
  },
];
