import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Brand } from "../_models/brand";
import { FiltersService } from "../_services/filters.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Country } from "../_models/country";

@Injectable()
export class CountriesResolver implements Resolve<Country[]> {
  constructor(
    private filterService: FiltersService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Country[]> {
    return this.filterService.getCountriesForCar().pipe(
      catchError((error) => {
        this.alertify.error("Problem retrieving data");
        //this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
