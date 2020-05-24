import { Component, OnInit, Input } from '@angular/core';
import { Announce } from '../../_models/announce';
import { Car } from '../../_models/car';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-announce-card',
  templateUrl: './announce-card.component.html',
  styleUrls: ['./announce-card.component.css']
})
export class AnnounceCardComponent implements OnInit {
  @Input()announce:Announce;
  // user: User = JSON.parse(localStorage.getItem('user'));
  @Input() user: User;


  constructor(private  authService: AuthService, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.user = data["user"];
    // });

    console.log("Anuntul este: ");
    console.log(this.announce);

  }

  sendLike(id: number){
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('Ai salvat anuntul: ' + this.announce.title);
    }, error => {
      this.alertify.error(error);
    });
  }

}
