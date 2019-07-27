import { CharacterSelectionComponent } from './../character-selection/character-selection.component';
import { EndgameType } from './../board';

import { GameScoreComponent } from './../game-score/game-score.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { TictactoeBoardComponent } from '../tictactoe-board/tictactoe-board.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        GameScoreComponent,
        TictactoeBoardComponent,
        CharacterSelectionComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should increase scores of players after board win state', () => {
    // send artificial event that first player won
    component.onEndgameEvent({ type: EndgameType.win, playerId: 0});
    // first player could be player[0] or player[1]
    expect(
      // at least one of them to have score 1 now
      (component.players[0].score == 1 || component.players[1].score == 1)
      // but not both
      && ((component.players[0].score + component.players[1].score) == 1)
      ).toBeTruthy();
  });

  it('should not increase scores of players after board draw state', () => {
    // send artificial event that board ended in a draw
    component.onEndgameEvent({ type: EndgameType.draw});
    expect(
      // both of them to still have score 0
      (component.players[0].score == 0 || component.players[1].score == 0)
    ).toBeTruthy();
  });

  it('should be at endgame state after board EndgameEvent', () => {
    // send artificial event that board ended
    component.onEndgameEvent({ type: EndgameType.draw });
    expect(component.isBoardEndgame).toBeTruthy();
  });

  it('should NOT be at endgame state after onResetBoard', () => {
    // get board instance
    let boardComponentInstance: TictactoeBoardComponent = fixture.debugElement
      .query(By.directive(TictactoeBoardComponent))
      .componentInstance;

    // send artificial event that board ended
    component.onEndgameEvent({ type: EndgameType.draw });

    // simulate user clicking button to reset board
    component.onResetBoard({}, boardComponentInstance);
    // expect board to have 0 turns elapsed now
    expect(component.isBoardEndgame).toBeFalsy();
  });

  it('should have board at 0 turns after onResetBoard', () => {
    // get board instance
    let boardComponentInstance: TictactoeBoardComponent = fixture.debugElement
      .query(By.directive(TictactoeBoardComponent))
      .componentInstance;

    // send artificial event that board ended
    component.onEndgameEvent({ type: EndgameType.draw });

    // simulate user clicking button to reset board
    component.onResetBoard({}, boardComponentInstance);
    // expect board to have 0 turns elapsed now
    expect(boardComponentInstance.turnNo == 0).toBeTruthy();
  });
});
