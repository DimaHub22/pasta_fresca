import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {

  }

  sendMessage(name: string, email: string, comment: string, rating: string ): Observable<{ name: string, email: string, comment: string, rating: string }> {
    return this.http.post<{ name: string, email: string, comment: string, rating: string }>(environment.api + '/message', {
      name, email, comment, rating
    })
  }
}
