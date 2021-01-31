import {
  AfterContentInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HistoryEntry } from 'src/app/interfaces/history-entry';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit, AfterContentInit {
  constructor(private source: SourceService) {
    // console.log(source.history);
  }

  @ViewChild('table', { read: ViewContainerRef }) table;

  // dataSource: HistoryEntry[] = this.source.history;
  dataSource: HistoryEntry[] = history.slice(0, -1);
  displayedColumns = ['move', 'opponent', 'player'];

  lastEntry: any = history[history.length - 1];

  scrollTo(el) {
    console.log(el);
    // el.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    //   inline: 'center',
    // });
  }
  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.scrollTo(this.table);
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
