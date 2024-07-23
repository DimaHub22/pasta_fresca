import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesHidden:string[]= []
  scrollTo:string = ''

  constructor(private http: HttpClient) { }

  getCategory():Observable<{name: string, _id: string}[]>{
    return this.http.get<{name: string, _id: string}[]>(environment.api + '/category')
  }

  createCategory(name: string): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(environment.api + '/category', {
      name
    })
  }

  editCategory(id:string, name:string):Observable<{name: string, _id: string}>{
    return this.http.patch<{name: string, _id: string}>(environment.api + `/category/${id}`,{
      name
    })
  }

  deleteCategory(id:string):Observable<{id:string}>{
    return this.http.delete<{id: string}>(environment.api + `/category/${id}`)
  }
}

