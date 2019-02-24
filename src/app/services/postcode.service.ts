import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostCode } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class PostcodeService {
  serverUrl: string;

  constructor(private _http: HttpClient) {
    this.serverUrl = environment.api.url;
  }

  getPostCode(_postCode: string): Observable<any> {
    // http://v0.postcodeapi.com.au/suburbs.json?postcode=5093
    return this._http
      .get(this.serverUrl + '/suburbs.json?postcode=' + _postCode)
  }


  getRange(_postCode: IPostCode): Observable<any>  {
    // http://v0.postcodeapi.com.au/radius.json?latitude=-34.836100000000002&longitude=138.66139999999999&distance=4000
    return this._http
    .get(this.serverUrl + '/radius.json?latitude=' + _postCode.latitude + '&longitude=' + _postCode.longitude + '&distance=4000')
  }

}
