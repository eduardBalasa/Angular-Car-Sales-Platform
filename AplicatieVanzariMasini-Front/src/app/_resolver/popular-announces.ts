import { Announce } from "../_models/announce";
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AnnounceService } from "../_services/announce.service";

@Injectable()
export class PopularAnnouncesResolver implements Resolve<Announce> {
  constructor(
    private announceService: AnnounceService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  announceParams: any = {};
  pageNumber = 1;
  pageSize = 6;

  resolve(route: ActivatedRouteSnapshot): Observable<Announce> {
    this.announceParams.AnnounceView = "Da";
    this.announceParams.all = true;
    return this.announceService.getAnnounces(this.pageNumber, this.pageSize, this.announceParams).pipe(
      catchError((error) => {
        this.alertify.error("Problem retrieving data");
        // this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
