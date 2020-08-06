import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CarAnnounce } from '../_models/carAnnounce';
import { Announce } from '../_models/announce';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

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

  getAnnounces(page?, itemsPerPage?, announceParams?): Observable<PaginatedResult<Announce[]>>{
    
    const paginatedResult: PaginatedResult<Announce[]> = new PaginatedResult<Announce[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if(announceParams != null) {
      params = params.append('all', announceParams.all);
      params = params.append('brand', announceParams.brand);
      params = params.append('model', announceParams.model);
      params = params.append('modelVersion', announceParams.modelVersion);
      params = params.append('fuel', announceParams.fuel);
      params = params.append('km', announceParams.km);
      params = params.append('manufacturingDate', announceParams.manufacturingDate);
      params = params.append('price', announceParams.price);
    }

    return this.http.get<Announce[]>(this.baseUrl + 'announce/getannounces', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    );
  }
  
  getAnnounce(id): Observable<Announce>{
    return this.http.get<Announce>(this.baseUrl + 'announce/' + id);
  }

  getAnnouncePhoto(userId: number, announceId: number){
    return this.http.get(this.baseUrl + 'users/' + userId + '/photos/' + announceId + '/announcephotos');
  }

  deleteAnnouncePhoto(userId: number, announceId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + announceId + '/announcephoto/' + id);
  }

  saveAnnounce(userId: number, announceId: number){
    return this.http.post(this.baseUrl + 'announce/' + userId + '/save/' + announceId, {});
  }

  getSavedAnnounces(userId: number): Observable<Announce[]>{
    return this.http.get<Announce[]>(this.baseUrl + 'announce/GetSavedAnnounces/' + userId)
  }

}
