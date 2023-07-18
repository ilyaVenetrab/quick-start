import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.loaderService.setLoad(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.setLoad(false);
      }),
    );
  }
}
