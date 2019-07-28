import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { secrets } from 'src/environments/secrets';
import { Player } from './player';
import { Md5 } from 'ts-md5/dist/md5';

import { ICharacter, IMarvelResponse} from './marvel-api';

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
  createParams(): HttpParams {
    let timestamp = String(new Date().getTime());
    let hash = Md5.hashAsciiStr(timestamp + secrets.marvelApiKeyPrivate + this.apiKey_);
    return new HttpParams()
      .set('apikey', this.apiKey_)
      .set('ts', timestamp)
      .set('hash', hash.toString())
  }

  // returns array with valid character names that start with 'name'
  getNameStartsWith(name: string): Observable<string[]> {
    const url = this.urlCharacters_;
    let params = this.createParams().set('nameStartsWith', name);
    return this.http.get<IMarvelResponse>(url, { params: params })
      .pipe( // handle response
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
      .pipe( // handle response
        map((response: IMarvelResponse) => {
          if(response.data.results.length < 1){
            // no character found
            throw new ErrorEvent("Character not found");
          }
          // return only the first character
          let player: Player;
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
      result.thumbnail.path + "." + result.thumbnail.extension // imageUrl
    );
  }

  // error inspection
  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      // client-side or network error
      console.error('A error occurred during Http request:', error.error.message, error.error);
    } else if (error instanceof ErrorEvent) {
      // known error was thrown, tell user
      errorMessage = error.type;
    } else if (error instanceof Error) {
      // unknown error occurred in the client
      console.error(error);
      // hide the specifics of the error from user, if you want it open the console
      errorMessage = "Something went wrong, try again!";
    } else {
      // backend error, returned an unsuccessful code
      // response body may contain a message or clues as to what went wrong
      console.error(
        'Backend returned code ', error.status,
        'body was: ', error.error,
        error);
      // default message
      errorMessage = "Marvel said: " + error.statusText;
      // some specific messages to user
      switch (error.status) {
        case 401:
          // 401	Invalid Hash	Occurs when a ts, hash and apikey parameter are sent but the hash is not valid per the above hash generation rule.
          if (error.error.code === "InvalidCredentials") {
            errorMessage = "The request to Marvel had an invalid key, was it set up?";
          }
          break;
        case 409:
          errorMessage = "The request I sent to Marvel was wrong, sorry";
          break;
        case 403:
          // Forbidden	Occurs when a user with an otherwise authenticated request attempts to access an endpoint to which they do not have access.
          errorMessage = "The request I sent to Marvel doesn't have permission";
          break;
      }
    }
    // return observable with a error message to the user
    return throwError(errorMessage);
  }
  
}
