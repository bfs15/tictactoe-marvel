import { Player } from './../player';
import { Component, OnInit } from '@angular/core';
import { EndgameStatus, EndgameType } from '../board';
import { SelectedCharacter } from '../character-selection/character-selection.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // number of players
  private playerNo_: number = 2;
  // list of players, undefined until selected by users
  players: Player[] = new Array<Player>(this.playerNo_);
  // whether board is at endgame state
  private isBoardEndgame_: boolean = false;
  // list of players' Indexes by turn order
  // [x] = y means player[y] goes at turn x
  private turnOrder_: number[];

  constructor() {
  }

  ngOnInit() {
    // TODO: implement character seletion
    this.players = new Array<Player>(this.playerNo);

    this.chooseTurnOrder();
  }

  onPlayerSelected($event: SelectedCharacter){
    this.players[$event.index] = $event.player;
  }

  // return player index from his turn order
  // id is the turn order the player goes at (playerId 0 goes first)
  indexFromTurnNo(id: number): number{
    return this.turnOrder_[id];
  }

  // add to winning players score
  onEndgameEvent(event: EndgameStatus){
    // endgameStatus has info about how the game ended
    if (event.type == EndgameType.win) {
      // winning player id (turn order) is event.playerId
      // get player index from his turn order
      let playerWinIndex = this.indexFromTurnNo(event.playerId);
      this.players[playerWinIndex].score ++;
    }
    this.isBoardEndgame_ = true;
  }

  // updates player turns according to this.turnOrder_
  updatePlayerTurns(){
    for (let turnNo = 0; turnNo < this.turnOrder_.length; turnNo++) {
      this.players[this.indexFromTurnNo(turnNo)].turn = turnNo;      
    }
  }

  // randomly assigns player turn order
  chooseTurnOrder(){
    // make turn order list (list player indexes in turn order)
    // equal chance of choosing any index
    let turnOrder = new Array<number>(this.players.length);
    let firstPlayerIndex = Math.floor(Math.random() * this.players.length);
    turnOrder[0] = firstPlayerIndex;
    if (turnOrder[0] == 0) {
      turnOrder[1] = 1;
    } else {
      turnOrder[1] = 0;
    }
    // set turn order made
    this.setTurnOrder(turnOrder);
  }

  setTurnOrder(turnOrder: number[]) {
    this.turnOrder_ = turnOrder;
    // updates player turn numbers as well
    this.updatePlayerTurns();
  }

  // starts new match on the board
  onResetBoard(event, boardComponent) {
    // chooses new player order
    this.chooseTurnOrder();
    // resets board
    this.isBoardEndgame_ = false;
    boardComponent.newBoard();
  }


  get isBoardEndgame(): boolean{
    return this.isBoardEndgame_;
  }

  get playerNo(){
    return this.playerNo_;
  }
}
