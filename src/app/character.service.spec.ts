import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { HttpClientModule } from '@angular/common/http';

const mockCharacterResponse = require("./../assets/data/testMocks/characterMockResponses/StartsWith=Spider.json");

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('CharacterService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ], providers: [
      ]
    })

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CharacterService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of characters', () => {
    const name = "Thano";
    service.getNameStartsWith(name).subscribe(result => {
      // console.log(result);
      // console.log(result.data.results[0].name);
      expect(result).toBeTruthy();
    })
    // expect a request to be made
    const req = httpTestingController
    .expectOne(req => req.method === 'GET'
      && req.url === 'https://gateway.marvel.com:443/v1/public/characters');
    // .expectOne('https://gateway.marvel.com:443/v1/public/characters');
    // the line above doesn't work with http parameters https://github.com/angular/angular/issues/19974

    console.log("req.request.params", req.request.params);
    // respond with mock response
    req.flush(mockCharacterResponse);
  });


  it('should return a local list of characters', () => {
    const name = "Sti";
    console.log(service.getByNameStartsWithLocal(name));
  });
});
