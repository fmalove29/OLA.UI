import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionAccess } from '../../../models/response/Administrator/PermissionAccess';
import { AppEndpoints } from '../../../AppEndpoints';
import { Access, AccessResponse } from '../../../models/Administrator/Access';
import { Observable } from 'rxjs';
import { PagedResponse } from '../../../models/common/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpClient) { }


  getAllAccess(params: {
    Name?: string;
    Module?: string;
    Role?: string;
    Page?: number;
    Limit?: number;
    Search?: string;
  }): Observable<PagedResponse<Access>> {
    let httpParams = new HttpParams();
    for (const key in params) {
      const typedKey = key as keyof typeof params;
      const value = params[typedKey];
    
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(typedKey, value.toString());
      }
    }
    

    return this.http.get<AccessResponse>(AppEndpoints.Access.GetAllAccess, { params: httpParams });
  }
  getUserAccess()
  {
    return this.http.get<PermissionAccess[]>(AppEndpoints.Permission.GetUserAccess);
  }
  
  UpdateAccess()
  {
    alert('test');
  }

  addModule(acceess : Access)
  {
    return this.http.post<Access>(AppEndpoints.Access.AddModule, acceess);
  }

}
