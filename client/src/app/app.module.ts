import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { FrameComponent } from './components/frame/frame.component';
import { BoardComponent } from './components/board/board.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { RackFrameComponent } from './components/rack-frame/rack-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FrameComponent,
    BoardComponent,
    ActionBarComponent,
    RackFrameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
