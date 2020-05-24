import { Transmission } from '../_models/transmission';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FiltersService } from '../_services/filters.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TransmissionsResolver implements Resolve<Transmission[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Transmission[]>{
        return this.filterService.getTransmissionsForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}