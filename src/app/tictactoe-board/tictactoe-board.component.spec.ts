import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeBoardComponent, endgameStatusFromSymbol, PlayerSymbols } from './tictactoe-board.component';
import { EndgameType } from '../board';

describe('TictactoeBoardComponent', () => {
  let component: TictactoeBoardComponent;
  let fixture: ComponentFixture<TictactoeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TictactoeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TictactoeBoardComponent);
    component = fixture.componentInstance;
    component.isEnabled = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be all empty at the start', () => {
    for (let rowNo = 0; rowNo < component.boardArray.length; rowNo++) {
      for (let colNo = 0; colNo < component.boardArray[rowNo].length; colNo++) {
        expect(component.isEmpty(rowNo, colNo)).toBeTruthy();
      }
    }
  })

  it('should return matching endgame status for player turns', () => {
    // x is first player, id 0
    expect(endgameStatusFromSymbol(PlayerSymbols.X)).toEqual({ type: EndgameType.win, playerId: 0 });
    // x is second player, id 1
    expect(endgameStatusFromSymbol(PlayerSymbols.O)).toEqual({ type: EndgameType.win, playerId: 1 });
  })

  it('isEndgame should return false at the start', () => {
    expect(component.isEndgame()).toBeFalsy();
  })

  let winMovesDiag = (component) => {
    component.clickCell(0, 0); // first X play
    component.clickCell(1, 0); // O play
    component.clickCell(1, 1); // X play
    component.clickCell(2, 0); // O play
    component.clickCell(2, 2); // X play
  }

  let winMovesRow = (component) => {
    component.clickCell(0, 0); // first X play
    component.clickCell(1, 0); // O play
    component.clickCell(0, 1); // X play
    component.clickCell(2, 0); // O play
    component.clickCell(0, 2); // X play
  }
  let winMovesCol = (component) => {
    component.clickCell(0, 1); // first X play
    component.clickCell(1, 0); // O play
    component.clickCell(1, 1); // X play
    component.clickCell(2, 0); // O play
    component.clickCell(2, 1); // X play
  }
  let drawMoves = (component) => {
    component.clickCell(0, 0); // first X play
    component.clickCell(0, 2); // O play
    component.clickCell(0, 1); // X play

    component.clickCell(1, 0); // O play
    component.clickCell(1, 2); // X play
    component.clickCell(1, 1); // O play
    
    component.clickCell(2, 0); // X play
    component.clickCell(2, 2); // X play
    component.clickCell(2, 1); // O play
  }

  it('isEndgame should return true if game ended in a diag play', () => {
    winMovesDiag(component);
    expect(component.isEndgame()).toBeTruthy();
  })
  it('isEndgame should return true if game ended in a row play', () => {
    winMovesRow(component);
    expect(component.isEndgame()).toBeTruthy();
  })
  it('isEndgame should return true if game ended in a col play', () => {
    winMovesCol(component);
    expect(component.isEndgame()).toBeTruthy();
  })
  it('isEndgame should return true if game ended in a draw', () => {
    drawMoves(component);
    expect(component.isEndgame()).toBeTruthy();
  })  

  it('should emit EndgameStatus.type win event on row win', (done) => {
    component.endgameEvent.subscribe(endgameStatus => {
      expect(endgameStatus.type).toEqual(EndgameType.win);
      done();
    });
    winMovesRow(component);
  });

  it('should emit EndgameStatus.type draw event', (done) => {
    component.endgameEvent.subscribe(endgameStatus => {
      expect(endgameStatus.type).toEqual(EndgameType.draw);
      done();
    });
    drawMoves(component);
  });

  it('should emit player turn event on first valid move', (done) => {
    // after next click, should be PlayerSymbols.o turn
    let subscription = component.playerTurnEvent.subscribe(playerTurn => {
      expect(playerTurn).toEqual(PlayerSymbols.O);
      done();
    });
    component.clickCell(0, 0); // first X play
  });

  it('should emit player turn event on second valid move', (done) => {
    component.clickCell(0, 0); // first X play
    // after next click, should be PlayerSymbols.x turn
    let subscription = component.playerTurnEvent.subscribe(g => {
      expect(g).toEqual(PlayerSymbols.X);
      done();
    });
    component.clickCell(0, 2); // O play
  });

  it('should not emit player turn event on invalid move', (done) => {
    component.clickCell(0, 0); // first X play
    // after next click, should be PlayerSymbols.x turn
    let playerTurnCallback = (g) => {
      expect(g).toEqual(PlayerSymbols.X);
      done();
    }
    component.playerTurnEvent.subscribe(playerTurnCallback);
    component.clickCell(0, 0); // invalid O play
    component.clickCell(0, 0); // invalid O play
    component.clickCell(0, 1); // valid O play
  });
});
