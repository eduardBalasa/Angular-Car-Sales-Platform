import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FiltersService } from '../_services/filters.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModelVersion } from '../_models/modelVersion';

@Injectable()
export class ModelVersionsResolver implements Resolve<ModelVersion[]> {
    constructor(private filterService: FiltersService, private router: Router,
        private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<ModelVersion[]>{
        return this.filterService.getModelVersionsForCar().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}