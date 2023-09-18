import { Injectable } from '@angular/core';
import { ICourse } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(limit = 10, search = ''): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`/allCourses?_start=0&_limit=${limit}&q=${search}`);
  }

  getItemById(id: number): Observable<ICourse> {
    return this.httpClient.get<ICourse>(`/allCourses/${id}`);
  }

  saveItem(entity: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>(`/allCourses`, entity);
  }

  updateItem(entity: ICourse): Observable<ICourse> {
    return this.httpClient.put<ICourse>(`/allCourses/${entity.id}`, entity);
  }

  removeItem(id: number): Observable<any> {
    return this.httpClient.delete(`/allCourses/${id}`);
  }
}
