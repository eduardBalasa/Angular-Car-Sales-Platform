import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/userswithroles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }

  getPhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/photosForModeration');
  }

  getAnnouncePhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/announcePhotosForModeration');
  }

  approvePhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {});
  }

  approveAnnouncePhoto(announcePhotoId) {
    return this.http.post(this.baseUrl + 'admin/approveAnnouncePhoto/' + announcePhotoId, {});
  }

  rejectPhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId, {});
  }

  rejectAnnouncePhoto(announcePhotoId) {
    return this.http.post(this.baseUrl + 'admin/rejectAnnouncePhoto/' + announcePhotoId, {});
  }
}