import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {LoadspinnerService} from '../service/loadspinner/loadspinner.service';


export const spinnerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(LoadspinnerService);

  spinnerService.show();

  return next(req).pipe(
    finalize(() => spinnerService.hide()
    )
  );
};
