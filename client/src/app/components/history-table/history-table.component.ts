import { Component, OnInit } from '@angular/core';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit {
  constructor(private source: SourceService) {
    console.log(source.history);
  }

  dataSource = this.source.history;
  displayedColumns = ['word', 'opponent', 'player'];
  ngOnInit(): void {}
}
