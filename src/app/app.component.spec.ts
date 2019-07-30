import { FooterComponent } from './footer/footer.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { GameComponent } from './game/game.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlayerScoreComponent } from './player-score/player-score.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TictactoeBoardComponent,
        GameScoreComponent,
        PlayerScoreComponent,
        GameComponent,
        CharacterSelectionComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render game', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-game').textContent).toBeTruthy();
  });
});
