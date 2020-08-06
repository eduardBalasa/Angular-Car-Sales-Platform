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
  pagination: Pagination;
  announceParams: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private announceService: AnnounceService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    console.log(this.savedAnnounces);
    this.loadSavedAnnounces();
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

  loadSavedAnnounces() {
    this.route.data.subscribe((data) => {
      this.savedAnnounces = data["announces"].result;
      this.pagination = data["announces"].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAnnounces();
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
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
