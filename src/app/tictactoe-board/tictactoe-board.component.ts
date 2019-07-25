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

  // TODO: change turns


  constructor() {
    // initialize a board 2darray with empty cells
    this.boardArray_ = new Array<Array<PlayerSymbols>>(this.size_);
    for (let row = 0; row < this.boardArray_.length; row++) {
      this.boardArray_[row] = new Array<PlayerSymbols>(this.size_).fill(PlayerSymbols.empty);
    }
  }

  ngOnInit() {
  }

  // checks and handles endgame states
  checkEndgame(){
    let isEndgame: boolean = false;
    let endResult = EndgameStatus.none;
    // TODO:
    // check board array for win or draw
    if (isEndgame){
      this.endgameEvent.emit(endResult);
    }
  }

  // checks if this cell is empty by its coordinates
  // (cell coordinates) => if they are empty
  isEmpty(rowNo, colNo) {
    return this.boardArray_[rowNo][colNo] == PlayerSymbols.empty;
  }

  // click handler for a cell position
  clickCell(rowNo, colNo) {
    if (this.isEmpty(rowNo, colNo)){
      // TODO: change symbol to whichever player is next
      this.boardArray_[rowNo][colNo] = PlayerSymbols.x;
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
