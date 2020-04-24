import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FiltersService } from '../_services/filters.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Price } from '../_models/price';

@Injectable()
export class PricesResolver implements Resolve<Price[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Price[]>{
        return this.filterService.getPricesForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                //this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}