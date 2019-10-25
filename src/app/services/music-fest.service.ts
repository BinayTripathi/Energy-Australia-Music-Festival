import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable , from , throwError } from 'rxjs';
import {map} from 'rxjs/operators'
import { Band } from '../model/band';
import { retry, catchError } from 'rxjs/operators';
import { MusicFestAdapter } from '../model/music-fest-adapter';
import { MusicFestival } from '../model/music-festival';

@Injectable({
  providedIn: 'root'
})
export class MusicFestService {

  apiRoot:String = 'http://localhost:8000/ems';
  public adapter = new MusicFestAdapter();

  constructor(private _http:Http) { }
  

  getBandDetailsFromWS():Observable<Boolean[]>
  {
    this.adapter.reset()
    let apiUrl=`${this.apiRoot}` + '/api/v1/festivals'  

    return this._http.get(apiUrl).pipe(
      map( (resp)=>{
        return resp.json().map(band=> this.adapter.adapt(band))
                    }
          ) ,
      retry(1),
       catchError(this.handleError)
    );
    
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
