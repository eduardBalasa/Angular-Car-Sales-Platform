import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Brand } from '../_models/brand';
import { FiltersService } from '../_services/filters.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fuel } from '../_models/fuel';

@Injectable()
export class FuelsResolver implements Resolve<Fuel[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Fuel[]>{
        return this.filterService.getFuelsForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}