import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { secrets } from 'src/environments/secrets';
import { Player } from './player';


interface ICharacterCollection {
  available: number,
    collectionURI: string,
      items: {
    resourceURI: string,
      name: string
  } [],
    returned: number
}

interface ICharacter {
  id: number,
  name: string,
  description: string,
  modified: Date,
  thumbnail: {
    path: string,
    extension: string
  },
  resourceURI: string,
  comics: ICharacterCollection,
  series: ICharacterCollection,
  stories: ICharacterCollection,
  events: ICharacterCollection,
  urls: {
    type: string,
    url: string
  }[]
}

interface IMarvelResponse {
  code: number, // The HTTP status code of the returned result
  status: string, // A string description of the call status
  etag: string, // A digest value of the content
  copyright: string, // The copyright notice for the returned result
  attributionText: string, // The attribution notice for this result
  attributionHTML: string, // An HTML representation of the attribution notice for this result
  data: {
    offset: number, // The requested offset(skipped results) of the call
    limit: number, // The requested result limit
    total: number, // The total number of results available
    count: number, // The total number of results returned by this call
    results: ICharacter[] // The list of entities returned by the call
  }
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  // base Url
  private readonly url_: string = environment.marvelApiUrl;
  // url for character requests
  private readonly urlCharacters_: string = `${this.url_}/v1/public/characters`;
  // api key for request parameters
  private readonly apiKey_: string = environment.marvelApiKey;

  constructor(private http: HttpClient) {
  }

  // create and setup parameters for MarvelAPI request
  createParams(): HttpParams{
    return new HttpParams()
    .set('apikey', this.apiKey_)
    // TODO: add timestamp
    // .set('ts', "timestamp")
    // TODO: hash = md5(ts+secrets.marvelApiKeyPrivate+publicKey)
    // .set('hash', "hash")
  }

  // returns array with valid character names that start with 'name'
  getNameStartsWith(name: string): Observable<string[]> {
    const url = this.urlCharacters_;
    let params = this.createParams().set('nameStartsWith', name);
    return this.http.get<IMarvelResponse>(url, { params: params })
      .pipe(
        map((response: IMarvelResponse) => {
          // return only character names
          let characterNames: string[];
          // map result data extracting only 'name' field
          characterNames = response.data.results.map(character => character.name);
          return characterNames;
        }),
        catchError(this.handleError)
      );
  }

  // returns valid character with 'name' (if it exists)
  getByName(name: string): Observable<Player> {
    const url = this.urlCharacters_;
    let params = this.createParams().set('name', name);
    
    return this.http.get<IMarvelResponse>(url, { params: params })
      .pipe(
        map((response: IMarvelResponse) => {
          // return only character names
          let player: Player;
          // map result data extracting only 'name' field
          player = this.playerFromResponse(response.data.results[0]);
          return player;
        }),
        catchError(this.handleError)
      );
  }
  // builds a Player from an ICharacter received from backend
  private playerFromResponse(result: ICharacter): Player {
    return new Player(
      result.name, // name
      result.thumbnail.path + result.thumbnail.extension // imageUrl
    );
  }

  // error inspection
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('A error occurred during Http request:', error.error.message);
    } else {
      // backend returned an unsuccessful code
      // response body may contain a message or clues as to what went wrong
      console.error(
        'Backend returned code ', error.status,
        'body was: ', error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Getting character information failed; please try again.');
  };
}
