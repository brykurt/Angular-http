import { Injectable, ErrorHandler } from '@angular/core';
import { ReaderTrackerError } from '../models/readerTrackerError';

@Injectable()
export class ReaderTrackerErrorHandlerService implements ErrorHandler {

  //this class handles the error message and  error number
  handleError(error: any): void {
    let customError: ReaderTrackerError = new ReaderTrackerError();
    customError.errorNumber = 200;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';

    console.log(customError);
  }

  constructor() { }

}
