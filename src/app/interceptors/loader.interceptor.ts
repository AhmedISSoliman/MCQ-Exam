import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { BusyService } from './../shared/services/busy.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private BusyService: BusyService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.BusyService.busy();
        return next.handle(request).pipe(
            finalize(() => {
                this.BusyService.idle();
            })
        );
    }
}
