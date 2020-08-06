import { Component, OnInit } from '@angular/core';
import { Announce } from '../../_models/announce';
import { AnnounceService } from '../../_services/announce.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.css']
})
export class AnnouncesComponent implements OnInit {
  announces: Announce[];
  announce: Announce;
  pagination: Pagination;
  id: number;

  constructor(private announceService: AnnounceService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAnnounce();
    this.getAnnounce(this.id);
    this.getAnnounces();
  }

  //announce/4
  //id- is a string in route but with '+' before 'this' it will parse as int in route
  loadAnnounce() {
    this.announceService.getAnnounce(+this.route.snapshot.params['id']).subscribe(( announce: Announce) => {
      this.announce = announce;
    }, error => {
      this.alertify.error(error);
    });
  }

  getAnnounce(id: number) {
    this.announceService.getAnnounce(id).subscribe((announce: Announce) => {
      this.announce = announce;
      console.log(this.announce);
    }, error => {
      console.log(error);
    });
  }
  getAnnounces(){
    this.announceService.getAnnounces().subscribe((res: PaginatedResult<Announce[]>) => {
      this.announces = res.result;
      this.pagination= res.pagination;
      console.log(this.announces);
    }, error => {
      console.log(error);
    });
  }
}
