import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { GameComponent } from './game/game.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { FormsModule } from '@angular/forms';
import { PlayerScoreComponent } from './player-score/player-score.component';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeBoardComponent,
    GameScoreComponent,
    GameComponent,
    CharacterSelectionComponent,
    PlayerScoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
