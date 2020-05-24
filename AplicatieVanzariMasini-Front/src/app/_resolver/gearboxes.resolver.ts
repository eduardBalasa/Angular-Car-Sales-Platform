import { Gearbox } from '../_models/gearbox';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FiltersService } from '../_services/filters.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GearboxesResolver implements Resolve<Gearbox[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Gearbox[]>{
        return this.filterService.getGearboxesForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}