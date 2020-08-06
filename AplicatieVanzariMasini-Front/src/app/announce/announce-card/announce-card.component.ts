import { Component, OnInit, Input } from '@angular/core';
import { Announce } from '../../_models/announce';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AnnounceService } from 'src/app/_services/announce.service';

@Component({
  selector: 'app-announce-card',
  templateUrl: './announce-card.component.html',
  styleUrls: ['./announce-card.component.css']
})
export class AnnounceCardComponent implements OnInit {
  @Input() announce:Announce;
  @Input() user: User;

  constructor(private  authService: AuthService, private announceService: AnnounceService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {    
    console.log("Anuntul este: ");
    console.log(this.announce);

  }

    saveAnnounce(id: number){
    this.announceService.saveAnnounce(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('Ai salvat anuntul: ' + this.announce.title);
    }, error => {
      this.alertify.error(error);
    });
  }
}
