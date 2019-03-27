import { ErrorHandler, Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private toastr: ToastrService) { }
  handleError(error) {
    const errorMessage = error.message ? error.message : error.error;
    this.toastr.error(errorMessage, 'Error', {timeOut: 2000});
    throw error;
  }

}
