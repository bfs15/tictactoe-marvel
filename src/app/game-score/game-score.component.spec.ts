import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';
import { Player } from '../player';
import { PlayerScoreComponent } from '../player-score/player-score.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  let addPlayers = (component) => {
    component.players = [new Player("Spider-Woman", "http://i.annihil.us/u/prod/marvel/i/mg/a/10/528d369de3e4f.jpg"), new Player("Thanos")];
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameScoreComponent, PlayerScoreComponent],
      imports: [
        BrowserAnimationsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;

    addPlayers(component);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render first players name in a div tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerName")[0].textContent).toBeTruthy();
  });

  it('should render first players image with class playerImage', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[0]).toBeTruthy();
  });

  it('should render players score with class playerScores', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerScores")[0]).toBeTruthy();
  });

  it('should render first players image with class playerImage as IMG', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[0].tagName).toBe("IMG");
  });
  
  it('should render second players image with class playerImage as DIV', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[1].tagName).toBe("DIV");
  });
});
