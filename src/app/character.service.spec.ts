import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { HttpClientModule } from '@angular/common/http';

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ], providers: [
      HttpClientModule,
    ]}));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });
});
