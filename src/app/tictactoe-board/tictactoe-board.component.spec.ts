import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeBoardComponent } from './tictactoe-board.component';

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
});
