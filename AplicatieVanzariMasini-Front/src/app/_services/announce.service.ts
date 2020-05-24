import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarAnnounce } from '../_models/carAnnounce';
import { Announce } from '../_models/announce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {

  baseUrl= environment.apiUrl;
  announceId: any;

  constructor(private http: HttpClient) { }

  createAnnounce(carAnnounce: CarAnnounce, userId: number){
    return this.http.post(this.baseUrl + 'announce/' + userId, carAnnounce);
  }

  getAnnounces(): Observable<Announce[]>{
    return this.http.get<Announce[]>(this.baseUrl + 'announce/getannounces')
  }
  
  getAnnounce(id): Observable<Announce>{
    return this.http.get<Announce>(this.baseUrl + 'announce/' + id);
  }

  getAnnouncePhoto(userId: number, announceId: number){
    return this.http.get(this.baseUrl + 'users/' + userId + '/photos/' + announceId + '/announcephotos');
  }


}
