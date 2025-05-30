import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUserRequest } from '../../../models/request/AppUserRequest';
import { Observable, retry } from 'rxjs';
import { AppEndpoints } from '../../../AppEndpoints';

@Injectable({
  providedIn: 'root'
})
export class CustomerEnrollmentService {

  constructor(private http: HttpClient) { }


  enroll(AppUser : AppUserRequest) : Observable<AppUserRequest>
  {
    return this.http.post<AppUserRequest>(AppEndpoints.Auth.Register, AppUser);
  }
}
