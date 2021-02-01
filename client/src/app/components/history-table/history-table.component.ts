import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HistoryEntry } from 'src/app/interfaces/history-entry';
import { GetRequestsService } from 'src/app/services/get-requests.service';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit, AfterViewInit {
  constructor(private source: SourceService, private http: GetRequestsService) {
    http.getDefinitions('haste,fast');
  }

  @ViewChildren('td') td: QueryList<ElementRef>;

  firstTurn = this.source.firstTurn;
  gameOver = this.source.gameOver;

  dataSource: HistoryEntry[] = this.source.history.slice(0, -1);
  displayedColumns = ['move', 'opponent', 'player'];

  lastEntry: any = this.source.history[this.source.history.length - 1];

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

let history = [
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
  {
    isAI: false,
    score: { computerScore: 0, playerScore: 0 },
    skip: { isSwap: false },
  },
  {
    isAI: true,
    word: 'Algin',
    points: 14,
    score: { computerScore: 14, playerScore: 0 },
    skip: false,
  },
];
