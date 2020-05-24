import { ManufacturingDate } from '../_models/manufacturingDate';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FiltersService } from '../_services/filters.service';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ManufacturingDateResolver implements Resolve<ManufacturingDate[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<ManufacturingDate[]>{
        return this.filterService.getManufacturingDateForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                //this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}