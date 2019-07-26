import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: Player[] = undefined;
  private isBoardEndgame_: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onEndgameEvent(event){
    // TODO: add score to winning player
    console.log(event);
    this.isBoardEndgame_ = true;
  }

  onResetBoard(event) {
    this.isBoardEndgame_ = false;
  }

  get isBoardEndgame(){
    return this.isBoardEndgame_;
  }
}
