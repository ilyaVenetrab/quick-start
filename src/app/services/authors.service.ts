import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from '../models/authors';

@Injectable()
export class AuthorsService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(search = ''): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>(`/authors?q=${search}`);
  }
}
