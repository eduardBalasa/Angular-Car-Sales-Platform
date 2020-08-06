import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getPhotosForApproval();
    this.getAnnouncePhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  getAnnouncePhotosForApproval() {
    this.adminService.getAnnouncePhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  approveAnnouncePhoto(announcePhotoId) {
    this.adminService.approveAnnouncePhoto(announcePhotoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === announcePhotoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectAnnouncePhoto(announcePhotoId) {
    this.adminService.rejectAnnouncePhoto(announcePhotoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === announcePhotoId), 1);
    }, error => {
      console.log(error);
    });
  }
}