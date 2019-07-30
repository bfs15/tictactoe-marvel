import { Component, Input } from '@angular/core';
import { Player } from '../player';
import { floatAnimation } from '../animations';

// receives information about two players and displays them
@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
  animations: [
    floatAnimation,
  ]
})
export class GameScoreComponent {
  @Input() players: Player[];
  private floatText_: string = "+1";

  get floatText(){
    return this.floatText_;
  }
}
