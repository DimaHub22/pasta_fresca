import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "../../../types/user.type";
import {environment} from "../../../environments/environment";
import {ServiceAuthService} from "./service-auth.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private serviceAuth: ServiceAuthService) {
  }

  createCategory(name: string): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(environment.api + '/category', {
      name
    })
  }
}
