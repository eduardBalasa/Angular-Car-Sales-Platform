import { Component, OnInit, Input } from "@angular/core";
import { Announce } from "src/app/_models/announce";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { AddAnnouncePhotoModalComponent } from "../add-announce-photo-modal/add-announce-photo-modal.component";
import { User } from "src/app/_models/user";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "@kolkov/ngx-gallery";
import { PhotoForAnnounce } from 'src/app/_models/photoForAnnounce';

@Component({
  selector: "app-announce-details-page",
  templateUrl: "./announce-details-page.component.html",
  styleUrls: ["./announce-details-page.component.css"],
})
export class AnnounceDetailsPageComponent implements OnInit {
  announce: Announce;
  bsModalRef: BsModalRef;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getAnnounce();
    console.log("Announce:");
    console.log(this.announce);

    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });

    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
    console.log("galleryImages:")
    console.log(this.galleryImages);
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.announce.photosForAnnounce) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imageUrls;
  }

  getAnnounce() {
    this.route.data.subscribe((data) => {
      this.announce = data.announceDetail;
    });
  }

  announcePhotoModal(announceId: number, announcePhotos: PhotoForAnnounce[] ) {
    const initialState = {
      announceId,
      announcePhotos
    };
    this.bsModalRef = this.modalService.show(AddAnnouncePhotoModalComponent, {
      initialState,
    });
    //this.bsModalRef.content.closeBtnName = "Close";
  }
}
