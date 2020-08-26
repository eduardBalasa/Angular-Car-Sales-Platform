import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "./_services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "./_models/user";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    const token = localStorage.getItem("token");
    const user: User = JSON.parse(localStorage.getItem("user"));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      // console.log(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
      // console.log(user);
    }
  }
  
  @HostListener("window:scroll")
  checkScroll() {  
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
