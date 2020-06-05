import { Component, OnInit } from "@angular/core";
import { Announce } from "src/app/_models/announce";
import { AdminService } from "src/app/_services/admin.service";

@Component({
  selector: "app-announce-management",
  templateUrl: "./announce-management.component.html",
  styleUrls: ["./announce-management.component.css"],
})
export class AnnounceManagementComponent implements OnInit {
  announces: Announce[];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // this.getAnnounces();
  }

  // getAnnounces() {
  //   this.adminService.getAnnounces().subscribe(
  //     (announces: Announce[]) => {
  //       this.announces = announces;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
