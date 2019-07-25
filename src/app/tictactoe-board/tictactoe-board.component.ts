import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// This component should handle the game board according to tic-tac-toe rules
// Creates an event when board reaches endgame state (with winner info)
// First player is always X

// possible endgames
// when board is not at endgame, 'none' is used
export enum EndgameStatus {
  none = 0,
  x = 1,
  o = 2,
  draw = 3,
}

let isEndgame = (endgameStatus: EndgameStatus) => {
  return endgameStatus != EndgameStatus.none;
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
  // first player is x
  private currentTurn_ = PlayerSymbols.x;
  // number of turns elapsed
  private turnNo_ = 0;

  constructor() {
    // initialize a board 2darray with empty cells
    this.boardArray_ = new Array<Array<PlayerSymbols>>(this.size_);
    for (let row = 0; row < this.boardArray_.length; row++) {
      this.boardArray_[row] = new Array<PlayerSymbols>(this.size_).fill(PlayerSymbols.empty);
    }
  }

  ngOnInit() {
  }

  checkDraw(){
    for (let rowNo = 0; rowNo < this.boardArray_.length; rowNo++) {
      for (let colNo = 0; colNo < this.boardArray_[rowNo].length; colNo++) {
        if(this.isEmpty(rowNo, colNo)){
          return EndgameStatus.none;
        }
      }
    }
    return EndgameStatus.draw;
  }

  // checks and handles endgame states
  checkEndgame(){
    // endgame result
    let endResult = EndgameStatus.none;

    // TODO: check board array for win
    if (!isEndgame(endResult)) {
      // endResult = this.checkWin();
      // ...
    }

    // check board array for draw
    if (!isEndgame(endResult)) {
      endResult = this.checkDraw();
    }

    // emit event if game ended
    if (isEndgame(endResult)){
      this.endgameEvent.emit(endResult);
    }
    return endResult;
  }

  // checks if this cell is empty by its coordinates
  // (cell coordinates) => if they are empty
  isEmpty(rowNo, colNo) {
    return this.boardArray_[rowNo][colNo] == PlayerSymbols.empty;
  }


  makeMove(rowNo, colNo){
    if (this.isEmpty(rowNo, colNo)) {
      // change symbol to whichever player is up
      this.boardArray_[rowNo][colNo] = this.currentTurn_;
      this.turnNo_++;
      return true;
    }
    return false;
  }

  nextTurn(){
    // change current turn player
    switch (this.currentTurn_){
    case PlayerSymbols.x:
      this.currentTurn_ = PlayerSymbols.o;
      break;
    case PlayerSymbols.o:
      this.currentTurn_ = PlayerSymbols.x;
      break;
    }
  }

  // click handler for a cell position
  clickCell(rowNo, colNo) {
    // try to do move
    let moved: boolean = this.makeMove(rowNo, colNo);
    if (moved) {
      // move might have ended the game, check
      let endgameStatus: EndgameStatus = this.checkEndgame();
      // if move succedded and game is not over, go to next turn
      if (!isEndgame(endgameStatus)) {
        this.nextTurn();
      }
    }
  }

  // returns the thumbnail of the players of this positions
  // returns empty string if none in the cell
  playerImage(rowNo, colNo) {
    // TODO: return actual player image
    if (this.isEmpty(rowNo, colNo)){
      return "";
    }
    return "http://i.annihil.us/u/prod/marvel/i/mg/a/10/528d369de3e4f.jpg";
  }

  // get symbol string from cell position
  getCellSymbolString(rowNo, colNo){
    return PlayerSymbols[this.boardArray_[rowNo][colNo]];
  }

  get boardArray(){
    return this.boardArray_;
  }

}
