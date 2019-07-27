import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionComponent } from './character-selection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterSelectionComponent', () => {
  let component: CharacterSelectionComponent;
  let fixture: ComponentFixture<CharacterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSelectionComponent],
      imports: [
        HttpClientTestingModule,
      ], providers: [
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
