import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.css']
})
export class PlayerScoreComponent {
  @Input() player: Player;
  @Input() playerNo: number;
}
