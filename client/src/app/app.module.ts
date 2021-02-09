import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { FrameComponent } from './components/frame/frame.component';
import { BoardComponent } from './components/board/board.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { RackFrameComponent } from './components/rack-frame/rack-frame.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { FilterDefsPipe } from './pipes/filter-defs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FrameComponent,
    BoardComponent,
    ActionBarComponent,
    RackFrameComponent,
    ModalDialogComponent,
    HistoryTableComponent,
    FilterDefsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatRippleModule,
    MatIconModule,
  ],
  entryComponents: [ModalDialogComponent],
  // providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
