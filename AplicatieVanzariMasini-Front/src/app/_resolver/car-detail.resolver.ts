import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Car } from '../_models/car';
import { CarService } from '../_services/car.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CarDetailResolver implements Resolve<Car> {
    constructor(private carService: CarService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Car>{
        return this.carService.getCar(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                // this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}