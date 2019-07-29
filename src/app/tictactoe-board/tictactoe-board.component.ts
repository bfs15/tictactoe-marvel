import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EndgameType, isEndgameType, EndgameStatus } from '../board';
import { state, trigger, style, animate, transition } from '@angular/animations';

// This component should handle the game board according to tic-tac-toe rules
// Creates an event when board reaches endgame state (with winner info)
// First player is always X

// symbols that are stored on the board
// board starts filled with empty positions
// when a player moves on empty position it becomes his
export enum PlayerSymbols {
  empty = -1,
  X = 0, // first player
  O = 1, // second player
}

// get player id from its symbol
// id 0 is the first player, 1 is the second and so on
export let playerIdfromPlayerSymbol = (playerSymbol: PlayerSymbols): number => {
  // in this case  it is simply the enum itself
  return <number>playerSymbol;
}

// turns a player symbol in the endgameStatus of its win
export let endgameStatusFromSymbol = (playerSymbol: PlayerSymbols): EndgameStatus => {  
  return { type: EndgameType.win, playerId: playerIdfromPlayerSymbol(playerSymbol) };
}

// Board component:
// lets players click to play their moves
// emits events:
//  when board reaches endgame state
//  when turn changes to another player's
@Component({
  selector: 'app-tictactoe-board',
  templateUrl: './tictactoe-board.component.html',
  styleUrls: ['./tictactoe-board.component.css'],
  animations: [
    trigger('fade',[
      state('void', style({transform: 'scale(0.01)',})),
      transition(':enter, :leave',[
        animate(150)
      ])
    ])
  ]
})
export class TictactoeBoardComponent implements OnInit {
  // emits event when game reaches conclusion
  @Output() endgameEvent = new EventEmitter<EndgameStatus>();
  // emits event when turn/active player changes
  @Output() playerTurnEvent = new EventEmitter<PlayerSymbols>();
  // If users can click on the board to play
  @Input() isEnabled: boolean;

  // 2darray with board information
  private boardArray_: PlayerSymbols[][];
  // example of a starting board of size 3 filled with 0
  // [[0,0,0],
  // [0,0,0],
  // [0,0,0]]

  // dimensions of the board: size_ x size_
  private size_: number = 3;
  // player that should move next
  private currentTurn_: PlayerSymbols;
  // number of turns elapsed
  private turnNo_: number;
  // board current EndgameStatus
  private endgameStatus_: EndgameStatus;

  constructor() {
    this.newBoard();
  }

  // reset board for a new match
  newBoard() {
    // initialize a board 2darray with empty cells
    this.boardArray_ = new Array<Array<PlayerSymbols>>(this.size_);
    for (let row = 0; row < this.boardArray_.length; row++) {
      this.boardArray_[row] = new Array<PlayerSymbols>(this.size_).fill(PlayerSymbols.empty);
    }
    // game start
    this.turnNo_ = 0;
    this.endgameStatus_ = {type: EndgameType.none, playerId: -1};
    // first player is x
    this.currentTurn_ = PlayerSymbols.X;
  }

  ngOnInit() {
  }

  isEndgame(): boolean {
    return isEndgameType(this.endgameStatus_.type);
  }

  // These next functions check possible win cenarios

  // checks and returns endgameStatus for diagonal row wins
  checkWinRow(): EndgameStatus {
    // for every row
    for (let rowNo = 0; rowNo < this.size_; rowNo++) {
      // count how many symbols of the player are in the row
      let colNo = 0;
      for (; colNo < this.size_; colNo++) {
        // stop counting if a diff symbol is found
        if (this.getCell(rowNo, colNo) != this.currentTurn_) {
          break;
        }
      }
      // if reached end of row, every symbol in the row was equal to currentTurn_
      if (colNo == this.size_) {
        // win for the current player
        return endgameStatusFromSymbol(this.currentTurn_);
      }
    }
    return {type: EndgameType.none};
  }

  // checks and returns endgameStatus for diagonal column wins
  checkWinCol(): EndgameStatus {
    // for every column
    for (let colNo = 0; colNo < this.size_; colNo++) {
      // count how many symbols of the player are in the row
      let rowNo = 0;
      for (; rowNo < this.size_; rowNo++) {
        // stop counting if a diff symbol is found
        if (this.getCell(rowNo, colNo) != this.currentTurn_) {
          break;
        }
      }
      // if reached end of col, every symbol in the col was equal to currentTurn_
      if (rowNo == this.size_) {
        // win for the current player
        return endgameStatusFromSymbol(this.currentTurn_);
      }
    }
    return { type: EndgameType.none };
  }

  // checks and returns endgameStatus for diagonal wins
  checkWinDiag(): EndgameStatus {
    // diag
    let rowNo = 0;
    for (; rowNo < this.size_; rowNo++) {
      // get diagonal cell, i == j
      if (this.getCell(rowNo, rowNo) != this.currentTurn_){
        break;
      }
    }
    // if reached end of diag, every symbol in the diag was equal to currentTurn_
    if (rowNo == this.size_) {
      // win for the current player
      return endgameStatusFromSymbol(this.currentTurn_);
    }

    // anti diag
    rowNo = 0
    for (; rowNo < this.size_; rowNo++) {
      // get diagonal cell, i == j
      if (this.getCell(rowNo, (this.size_ - 1) - rowNo) != this.currentTurn_) {
        break;
      }
    }
    // if reached end of diag, every symbol in the diag was equal to currentTurn_
    if (rowNo == this.size_) {
      // win for the current player
      return endgameStatusFromSymbol(this.currentTurn_);
    }
    return { type: EndgameType.none };
  }

  // checks and sets win state of the board
  checkWin() {
    // check row win
    if (!this.isEndgame()) {
      this.endgameStatus_ = this.checkWinRow();
    }
    // check col win
    if (!this.isEndgame()) {
      this.endgameStatus_ = this.checkWinCol();
    }
    // check diagonal win
    if (!this.isEndgame()) {
      this.endgameStatus_ = this.checkWinDiag();
    }
  }

  // checks and sets if game ended in a draw
  checkDraw() {
    for (let rowNo = 0; rowNo < this.boardArray_.length; rowNo++) {
      for (let colNo = 0; colNo < this.boardArray_[rowNo].length; colNo++) {
        if (this.isEmpty(rowNo, colNo)) {
          this.endgameStatus_.type = EndgameType.none;
          return;
        }
      }
    }
    this.endgameStatus_.type = EndgameType.draw;
  }

  // checks and handles endgame states
  checkEndgame(){
    // check board array for win
    if (!this.isEndgame()) {
      this.checkWin();
    }

    // check boardArray for draw
    if (!this.isEndgame()) {
      this.checkDraw();
    }

    // emit event if game ended
    if (this.isEndgame()){
      this.endgameEvent.emit(this.endgameStatus_);
    }
  }

  // checks if this cell is empty by its coordinates
  // (cell coordinates) => if they are empty
  isEmpty(rowNo, colNo): boolean {
    return this.boardArray_[rowNo][colNo] == PlayerSymbols.empty;
  }

  // Attempts to move in position (rowNo, colNo)
  // moves for whichever player's turn it is curretly (this.currentTurn_)
  // returns true if movement is valid and made
  // returns false if movement is invalid
  makeMove(rowNo, colNo): boolean {
    if (this.isPlayable && this.isEmpty(rowNo, colNo)) {
      // change symbol to whichever player is up
      this.boardArray_[rowNo][colNo] = this.currentTurn_;
      this.turnNo_++;
      return true;
    }
    return false;
  }

  nextPlayer(){
    // change current turn player
    switch (this.currentTurn_){
    case PlayerSymbols.X:
      this.currentTurn_ = PlayerSymbols.O;
      break;
    case PlayerSymbols.O:
      this.currentTurn_ = PlayerSymbols.X;
      break;
    }
  }

  // click handler for a cell position
  clickCell(rowNo, colNo) {
    // try to do move
    let moved: boolean = this.makeMove(rowNo, colNo);
    if (moved) {
      // move might have ended the game, check
      this.checkEndgame();
      // if move succedded and game is not over, go to next player
      if (!this.isEndgame()) {
        this.nextPlayer();
        // tell subscribers
        this.playerTurnEvent.emit(this.currentTurn_);
      }
    }
  }

  // returns the thumbnail of the players of this positions
  // returns empty string if none in the cell
  playerImage(rowNo, colNo): string {
    // TODO: return actual player image
    if (this.isEmpty(rowNo, colNo)){
      return "";
    }
    return "http://i.annihil.us/u/prod/marvel/i/mg/a/10/528d369de3e4f.jpg";
  }

  // get symbol string from cell position
  getCellSymbolString(rowNo, colNo): string{
    let cellSymbol: PlayerSymbols = this.boardArray_[rowNo][colNo];
    if (cellSymbol == PlayerSymbols.empty){
      return "";
    }
    // return the string of the enum
    return PlayerSymbols[cellSymbol];
  }

  getCell(rowNo, colNo): PlayerSymbols {
    return this.boardArray_[rowNo][colNo];
  }

  get boardArray(): PlayerSymbols[][] {
    return this.boardArray_;
  }

  get turnNo(): number {
    return this.turnNo_
  }

  get isPlayable(): boolean {
    return this.isEnabled && !this.isEndgame();
  }

}
