import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Reader } from '../models/reader';
import { DataService } from '../core/data.service';
import { ReaderTrackerError } from '../models/readerTrackerError';

@Injectable({
  providedIn: 'root'
})
export class ReaderResolverService implements Resolve<Reader[] | ReaderTrackerError> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reader[] | ReaderTrackerError> {
    return this.dataService.getAllReaders()
      .pipe(
        catchError(err => of(err))
      );
  }

}