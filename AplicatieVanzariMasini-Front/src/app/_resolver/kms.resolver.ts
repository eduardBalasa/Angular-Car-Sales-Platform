import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FiltersService } from '../_services/filters.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Km } from '../_models/km';

@Injectable()
export class KmsResolver implements Resolve<Km[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Km[]>{
        return this.filterService.getKmsForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                //this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}