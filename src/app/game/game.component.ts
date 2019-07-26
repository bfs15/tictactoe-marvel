import { Player } from './../player';
import { Component, OnInit } from '@angular/core';
import { EndgameStatus, EndgameType } from '../board';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: Player[] = undefined;
  private isBoardEndgame_: boolean = false;

  constructor() {
  }

  ngOnInit() {
    // TODO: implement character seletion
    this.players = [new Player("Spider-Woman", "http://i.annihil.us/u/prod/marvel/i/mg/a/10/528d369de3e4f.jpg"), new Player("Thanos")];
  }

  onEndgameEvent(event: EndgameStatus){
    if (event.type == EndgameType.win){
      this.players[event.playerId].score ++;
    }
    this.isBoardEndgame_ = true;
  }

  onResetBoard(event, boardComponent) {
    // TODO: choose random first player
    this.isBoardEndgame_ = false;
    boardComponent.newBoard();
  }

  get isBoardEndgame(): boolean{
    return this.isBoardEndgame_;
  }
}
