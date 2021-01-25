import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BtnAttrs } from 'src/app/interfaces/btn-attrs';
import { SourceService } from 'src/app/services/source.service';
import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit, OnDestroy {
  constructor(private source: SourceService, public dialog: MatDialog) {}

  tiles: any[] = [];
  rackSubscription: Subscription;

  onOff = true;
  btnAttributes: BtnAttrs = null;
  btnAttributeSubscription: Subscription;

  mixTiles() {
    console.log(this.btnAttributes);

    if (this.tiles.length < 2) return;

    let shuffledRack =
      this.tiles.length === 2 ? this.tiles.reverse() : _.shuffle(this.tiles);

    this.source.changePlayerRack(shuffledRack);
  }

  showBagContent() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'bag',
      },
    });
  }

  showSettings() {
    this.dialog.open(ModalDialogComponent, {
      width: '75%',
      // height: '100%',
      data: {
        type: 'settings',
      },
    });
  }

  // $("#settingsBtn").click(showSettings);

  // $("#swapRecall").click(() => ($("#swapRecall").text().includes("Swap") ? swap() : recall()));
  // $("#scoresBtn").click(showScoreHistory);
  // $("#passPlay").click(() =>
  //   $("#passPlay").text().includes("Pass") ? prePass(true, false, false, playersTurn) : play()
  // );

  // $("#startGame").click(rematch);
  // $("#zoomOut").click(zoomOut);
  // $("#zoomIn").click(() => zoomIn($('[data-location="7,7"]')[0]));
  // $("#board .column").dblclick((e) => {
  //   isZoomed ? zoomOut() : zoomIn(e.target);
  //   e.stopImmediatePropagation();
  // });

  ngOnInit(): void {
    this.rackSubscription = this.source.currentPlayerRack.subscribe(
      (tiles) => (this.tiles = tiles)
    );
    this.btnAttributeSubscription = this.source.currentBtnAttr.subscribe(
      (attrs) => {
        this.btnAttributes = attrs;
        setTimeout(() => {
          this.onOff = false;
        }, 0);
        setTimeout(() => {
          this.onOff = true;
        }, 0);
      }
    );
  }

  ngOnDestroy(): void {
    this.rackSubscription.unsubscribe();
    this.btnAttributeSubscription.unsubscribe();
  }
}
