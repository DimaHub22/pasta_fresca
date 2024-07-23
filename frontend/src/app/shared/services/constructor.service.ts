import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositionsType} from "../../../types/positions.type";
import {environment} from "../../../environments/environment";
import {ConstructorType} from "../../../types/constructor.type";

@Injectable({
  providedIn: 'root'
})
export class ConstructorService {
  positionsHidden: string[] = []

  constructor(private http: HttpClient) { }



  getPosition(url:string): Observable<ConstructorType[]> {
    return this.http.get<ConstructorType[]>(environment.api + `/${url}`)

  }

  createPosition(url:string,name: string, cost: number,  image: File, description?: string,): Observable<ConstructorType> {
    let fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    if(description){
      fd.append('description', description)
    }
    fd.append('name', name)
    fd.append('cost', String(cost))

    return this.http.post<ConstructorType>(environment.api + `/${url}`, fd)
  }

  updatePosition(url:string, id:string,name: string, cost: number, image: File, description?: string): Observable<ConstructorType> {
    let fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    if (description){
      fd.append('description', description)
    }else {
      fd.append('description', '')
    }
    fd.append('name', name)
    fd.append('cost', String(cost))


    return this.http.patch<ConstructorType>(environment.api + `/${url}/${id}`, fd)
  }

  deletePosition(id: string, url:string):Observable<{message:string}>{
    return this.http.delete<{message:string}>(environment.api + `/${url}/${id}`)

  }

  getByPositionId(id: string, url:string): Observable<ConstructorType> {
    return this.http.get<ConstructorType>(environment.api + `/${url}/${id}`)
  }

}
