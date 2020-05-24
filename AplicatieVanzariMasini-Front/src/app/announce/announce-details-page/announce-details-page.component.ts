import { Component, OnInit, Input } from '@angular/core';
import { Announce } from 'src/app/_models/announce';

@Component({
  selector: 'app-announce-details-page',
  templateUrl: './announce-details-page.component.html',
  styleUrls: ['./announce-details-page.component.css']
})
export class AnnounceDetailsPageComponent implements OnInit {
  @Input()announce:Announce;
  constructor() { }

  ngOnInit() {

  }

}
