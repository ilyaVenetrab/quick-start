import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { autoSpy, SpyOf } from '../utils/auto-spy';
import { MessageService } from 'primeng/api';

describe('HttpErrorInterceptor', () => {
  const messageService: SpyOf<MessageService> = autoSpy(MessageService);

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptor, { provide: MessageService, useValue: messageService }],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
