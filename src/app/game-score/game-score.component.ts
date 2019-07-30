import { Component, Input } from '@angular/core';
import { Player } from '../player';
import { floatAnimation } from '../animations';

/** Pure component receives information about two players and displays them*/
@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
  animations: [
    floatAnimation,
  ]
})
export class GameScoreComponent {
  /** Players to display the score */
  @Input() players: Player[];
  /** what text appears above the score when someone wins */
  private floatText_: string = "+1";

  get floatText(){
    return this.floatText_;
  }
}
