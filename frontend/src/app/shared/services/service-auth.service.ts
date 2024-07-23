import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {
  private token: string = ''
  public users: string = ''

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<{ token: string, user: string }> {
    return this.http.post<{ token: string, user: string }>(environment.api + '/auth/login', {
      email, password
    })
      .pipe(
        tap(({token, user}) => {
          localStorage.setItem('auth-token', token)
          localStorage.setItem('user-db',user)
          this.setToken(token)
          this.setName(user)
        })
      )
  }

  setName(user:string){
    this.users = user
  }
  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.removeItem('auth-token')
  }
}
