import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEndpoints } from '../../../AppEndpoints';
import { PermissionRequest } from '../../../models/request/Administrator/Permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  addPermission(permission : PermissionRequest): Observable<PermissionRequest>
  {
    return this.http.post<PermissionRequest>(AppEndpoints.Permission.AddPermission, permission);
  }
}
