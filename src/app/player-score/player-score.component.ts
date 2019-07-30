import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';

/** Pure component to display player information in the scoreboard */
@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.css']
})
export class PlayerScoreComponent {
  @Input() player: Player;
  @Input() playerNo: number;
}
