import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEndpoints } from '../../../AppEndpoints';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserRolesService {

  constructor(private http  : HttpClient) { }

  getSelectedUserRole(userId : string) : Observable<string[]>
  {
    return this.http.get<string[]>(AppEndpoints.LookUp.SelectedUserRole, {params : {userId : userId}});
  }
}
