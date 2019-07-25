import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeBoardComponent, endgameStatusFromSymbol, PlayerSymbols, EndgameStatus } from './tictactoe-board.component';

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
    expect(endgameStatusFromSymbol(PlayerSymbols.x)).toEqual(EndgameStatus.x);
    expect(endgameStatusFromSymbol(PlayerSymbols.o)).toEqual(EndgameStatus.o);
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

  it('should emit EndgameStatus.x event on row win', (done) => {
    component.endgameEvent.subscribe(g => {
      expect(g).toEqual(EndgameStatus.x);
      done();
    });
    winMovesRow(component);
  });

  it('should emit EndgameStatus.draw event', (done) => {
    component.endgameEvent.subscribe(g => {
      expect(g).toEqual(EndgameStatus.draw);
      done();
    });
    drawMoves(component);
  });
});
