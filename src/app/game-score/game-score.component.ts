import { Component, Input } from '@angular/core';
import { Player } from '../player';

// receives information about two players and displays them
@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css']
})
export class GameScoreComponent {
  @Input() players: Player[];

  constructor(){
    // TODO: receive players from parent
    this.players = new Array<Player>(2);
    this.players[0] = new Player("Spider-Woman");
    this.players[1] = new Player("Spider-Man");
  }
}
