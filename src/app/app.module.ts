import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
