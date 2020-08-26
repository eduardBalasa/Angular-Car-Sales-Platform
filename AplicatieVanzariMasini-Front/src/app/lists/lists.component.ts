import { Component, OnInit } from "@angular/core";
import { Pagination, PaginatedResult } from "../_models/pagination";
import { User } from "../_models/user";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../_services/alertify.service";
import { AnnounceService } from "../_services/announce.service";
import { Announce } from "../_models/announce";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
})
export class ListsComponent implements OnInit {
  users: User[];
  savedAnnounces: Announce[];
  announcesByUser: Announce[];
  pagination: Pagination;
  userAnnouncesPagination: Pagination;
  announceParams: any = {};
  isUserAnnounces = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private announceService: AnnounceService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadAnnouncesFromRouter();
    console.log(this.announcesByUser);
    console.log(this.savedAnnounces);
    this.announceParams.all = false;
  }

  // loadUsers() {
  //   this.userService
  //     .getUsers(
  //       this.pagination.currentPage,
  //       this.pagination.itemsPerPage,
  //       null,
  //       this.likesParam
  //     )
  //     .subscribe(
  //       (res: PaginatedResult<User[]>) => {
  //         this.users = res.result;
  //         this.pagination = res.pagination;
  //       },
  //       (error) => {
  //         this.alertify.error(error);
  //       }
  //     );
  // }

  loadAnnouncesFromRouter() {
    this.route.data.subscribe((data) => {
      this.savedAnnounces = data["announces"].result;
      this.announcesByUser = data["announcesByUser"].result;
      this.pagination = data["announces"].pagination;
      this.userAnnouncesPagination = data["announcesByUser"].pagination;
    });
  }

  changeAnnounces() {
    this.isUserAnnounces = !this.isUserAnnounces
  }

  loadSavedAnnounces() {
    this.announceService
      .getAnnounces(this.pagination.currentPage, this.pagination.itemsPerPage, this.announceParams)
      .subscribe(
        (res: PaginatedResult<Announce[]>) => {
          this.savedAnnounces = res.result;
          this.pagination = res.pagination;
          if(this.isUserAnnounces) {
            this.changeAnnounces();
          }
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  loadUserAnnounces() {
    this.announceService
      .getAnnouncesByUser(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<Announce[]>) => {
          this.announcesByUser = res.result;
          this.pagination = res.pagination;
          if(!this.isUserAnnounces) {
            this.changeAnnounces();
          }
          console.log("User announces:", this.announcesByUser);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadSavedAnnounces();
  }

  userPageChanged(event: any): void {
    this.userAnnouncesPagination.currentPage = event.page;
    this.loadUserAnnounces();
  }

  loadAnnounces() {
    this.announceService
      .getAnnounces(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.announceParams
      )
      .subscribe(
        (res: PaginatedResult<Announce[]>) => {
          this.savedAnnounces = res.result;
          this.announcesByUser = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
