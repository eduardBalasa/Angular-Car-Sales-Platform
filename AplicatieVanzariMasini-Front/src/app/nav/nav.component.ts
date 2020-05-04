import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddAnnounceModalComponent } from '../add-announce-modal/add-announce-modal.component';
import { Brand } from '../_models/brand';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  bsModalRef: BsModalRef;   

  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router, private modalService: BsModalService) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  announceModal(brands: Brand){
    const initialState = {
      brands
    };
    this.bsModalRef = this.modalService.show(AddAnnounceModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Te-ai autentificat cu succes!');
      },
      error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Deconectat');
    this.router.navigate(['/home']);
  }
}
