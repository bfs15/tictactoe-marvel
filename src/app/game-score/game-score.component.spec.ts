import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';
import { Player } from '../player';

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let addPlayers = (component) => {
    component.players = [new Player("Spider-Woman", "http://i.annihil.us/u/prod/marvel/i/mg/a/10/528d369de3e4f.jpg"), new Player("Thanos")];
    fixture.detectChanges();
  }

  it('should render first players name in a div tag', () => {
    addPlayers(component);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerName")[0].textContent).toBeTruthy();
  });

  it('should render first players image with class playerImage', () => {
    addPlayers(component);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[0]).toBeTruthy();
  });

  it('should render first players score with class playerScore', () => {
    addPlayers(component);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerScore")[0]).toBeTruthy();
  });

  it('should render first players image with class playerImage as IMG', () => {
    addPlayers(component);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[0].tagName).toBe("IMG");
  });
  
  it('should render second players image with class playerImage as DIV', () => {
    addPlayers(component);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.getElementsByClassName("playerImage")[1].tagName).toBe("DIV");
  });
});
