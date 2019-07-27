import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { GameComponent } from './game/game.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeBoardComponent,
    GameScoreComponent,
    GameComponent,
    CharacterSelectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
