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
import { PhotoForAnnounce } from "src/app/_models/photoForAnnounce";
import { AnnounceService } from "src/app/_services/announce.service";
import { PaginatedResult } from "src/app/_models/pagination";

declare const L: any;

@Component({
  selector: "app-announce-details-page",
  templateUrl: "./announce-details-page.component.html",
  styleUrls: ["./announce-details-page.component.css"],
})
export class AnnounceDetailsPageComponent implements OnInit {
  announce: Announce;
  public announces: Announce[];
  popularAnnounces: Announce[];
  bsModalRef: BsModalRef;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private announceService: AnnounceService
  ) {}

  ngOnInit() {
    this.getAnnounce();
    console.log("Announce:");
    console.log(this.announce);

    this.route.data.subscribe((data) => {
      this.user = data["user"];
      this.popularAnnounces = data["popularAnnounces"].result;
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
    console.log("galleryImages:");
    console.log(this.galleryImages);

    if (!navigator.geolocation) {
      console.log("location is not supported");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map("mapid").setView(latLong, 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWJsczIyIiwiYSI6ImNrZTl2NDl1djA2ajkyc3Qwc2R2amxucDIifQ.FAFzrPSdhDuXQ4ZXEXrUZg",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: "your.mapbox.access.token",
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);
      // marker.bindPopup('<b>Te afli aici</b>').openPopup();
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      }
    );
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

  announcePhotoModal(announceId: number, announcePhotos: PhotoForAnnounce[]) {
    const initialState = {
      announceId,
      announcePhotos,
    };
    this.bsModalRef = this.modalService.show(AddAnnouncePhotoModalComponent, {
      initialState,
    });
    //this.bsModalRef.content.closeBtnName = "Close";
  }

  // getAnnounces() {
  //   for (let iterator = 0; iterator < 4; iterator++){
  //     this.announceService.getAnnounces().subscribe(
  //       (countedAnnounces: PaginatedResult<Announce[]>) => {
  //         this.announces = countedAnnounces.result;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //       );
  //     }
  // }
}
