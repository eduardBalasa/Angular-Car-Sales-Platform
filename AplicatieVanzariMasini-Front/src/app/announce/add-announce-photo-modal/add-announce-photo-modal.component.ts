import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PhotoForAnnounce } from 'src/app/_models/photoForAnnounce';

@Component({
  selector: 'app-add-announce-photo-modal',
  templateUrl: './add-announce-photo-modal.component.html',
  styleUrls: ['./add-announce-photo-modal.component.css']
})
export class AddAnnouncePhotoModalComponent implements OnInit {

  announceId: number;
  announcePhotos: PhotoForAnnounce[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addAnnouncePhoto(){

  }

}
