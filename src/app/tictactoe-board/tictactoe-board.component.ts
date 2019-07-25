import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// This component should handle the game board according to tic-tac-toe rules
// Creates an event when board reaches endgame state (with winner info)
// First player is always X

// possible endgames
// when board is not at endgame, 'none' is used
export enum EndgameStatus {
  none = -1,
  draw = 0,
  x = 1,
  o = 2,
}
// symbols that are stored on the board
// board starts filled with empty positions
// when a player moves on empty position it becomes his
export enum PlayerSymbols {
  empty = 0,
  x = 1,
  o = 2,
}

@Component({
  selector: 'app-tictactoe-board',
  templateUrl: './tictactoe-board.component.html',
  styleUrls: ['./tictactoe-board.component.css']
})
export class TictactoeBoardComponent implements OnInit {
  // emits event when game reaches conclusion
  @Output() endgameEvent = new EventEmitter<EndgameStatus>();

  // 2darray with board information
  private boardArray_: PlayerSymbols[][];
  // example of a starting board of size 3 filled with 0
  // [[0,0,0],
  // [0,0,0],
  // [0,0,0]]

  // dimensions of the board: size_ x size_
  private size_: number = 3;

  constructor() {
    // initialize a board 2darray with empty cells
    this.boardArray_ = new Array<Array<PlayerSymbols>>(this.size_);
    for (let row = 0; row < this.boardArray_.length; row++) {
      this.boardArray_[row] = new Array<PlayerSymbols>(this.size_).fill(PlayerSymbols.empty);
    }
  }

  ngOnInit() {
  }

  checkEndgame(){
    let isEndgame: boolean = false;
    let endResult = EndgameStatus.none;
    // TODO:
    // check board array for win or draw
    if (isEndgame){
      this.endgameEvent.emit(endResult);
    }
  }

}
