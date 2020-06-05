import { Component, OnInit, Input } from '@angular/core';
import { Announce } from 'src/app/_models/announce';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announce-details-page',
  templateUrl: './announce-details-page.component.html',
  styleUrls: ['./announce-details-page.component.css']
})
export class AnnounceDetailsPageComponent implements OnInit {
  announce : Announce;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.getAnnounce();
    console.log("Announce:")
    console.log(this.announce)
  }

  getAnnounce() {
    this.route.data.subscribe((data) => {
      this.announce = data.announceDetail;
    });
  }

}
