import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { secrets } from 'src/environments/secrets';


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
  private readonly url_: string = environment.marvelApiUrl;
  private readonly urlCharacters_: string = `${this.url_}/v1/public/characters`;
  private readonly apiKey_: string = environment.marvelApiKey;

  constructor(private http: HttpClient) {
  }

  // create and setup parameters for MarvelAPI request
  createParams(): HttpParams{
    let params = new HttpParams();
    params.set('apikey', this.apiKey_);
    // TODO: add timestamp
    // params.set('ts', timestamp);
    // TODO: hash = md5(ts+secrets.marvelApiKeyPrivate+publicKey)
    // params.set('hash', hash);
    return params;
  }

  // TODO: handle error
  private handleError(error: HttpErrorResponse) {
    
  };

  // returns array with valid character names that start with 'name'
  getNameStartsWith(name: string): Observable<IMarvelResponse> {
    const url = this.urlCharacters_;
    let params = this.createParams().set('nameStartsWith', name);
    // TODO: handle error
    return this.http.get<IMarvelResponse>(url, { params: params });
  }

  // returns valid character with 'name' (if it exists)
  getByName(name: string): Observable<IMarvelResponse> {
    const url = this.urlCharacters_;
    let params = this.createParams().set('name', name);
    // TODO: handle error
    return this.http.get<IMarvelResponse>(url, { params: params });
  }
}
