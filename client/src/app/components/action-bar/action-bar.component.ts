import { Component, OnInit } from '@angular/core';
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  constructor(private gameService: GameLogicService) {}

  mixTiles() {
    if (document.querySelectorAll('#rack .tile').length < 2) return;
    this.gameService.mix(document);
  }
  //   $("#bagBtn").click(showBagContent);
  // $("#scoresBtn").click(showScoreHistory);
  // $("#swapRecall").click(() => ($("#swapRecall").text().includes("Swap") ? swap() : recall()));
  // $("#passPlay").click(() =>
  //   $("#passPlay").text().includes("Pass") ? prePass(true, false, false, playersTurn) : play()
  // );
  // $("#settingsBtn").click(showSettings);

  // $("#startGame").click(rematch);
  // $("#zoomOut").click(zoomOut);
  // $("#zoomIn").click(() => zoomIn($('[data-location="7,7"]')[0]));
  // $("#board .column").dblclick((e) => {
  //   isZoomed ? zoomOut() : zoomIn(e.target);
  //   e.stopImmediatePropagation();
  // });

  ngOnInit(): void {}
}
