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
  }
}
