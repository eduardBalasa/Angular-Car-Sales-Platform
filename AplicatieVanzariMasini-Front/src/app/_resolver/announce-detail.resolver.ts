import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Announce } from '../_models/announce';
import { AnnounceService } from '../_services/announce.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AnnounceDetailResolver implements Resolve<Announce> {
    constructor(private announceService: AnnounceService,private authService: AuthService,
        private router: Router, private alertify: AlertifyService){}
        
    resolve(route: ActivatedRouteSnapshot) : Observable<Announce>{
        return this.announceService.getAnnounce(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }
}
