import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { FrameComponent } from './components/frame/frame.component';
import { BoardComponent } from './components/board/board.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { RackFrameComponent } from './components/rack-frame/rack-frame.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FrameComponent,
    BoardComponent,
    ActionBarComponent,
    RackFrameComponent,
    ModalDialogComponent,
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
  ],
  entryComponents: [ModalDialogComponent],
  // providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
