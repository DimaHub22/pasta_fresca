import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {PositionsType} from "../../../types/positions.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PositionHiddenType} from "../../../types/position-hidden.type";


@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  positionsHidden: string[] = []


  constructor(private http: HttpClient) {

  }

  getPositionHidden():Observable<PositionHiddenType[]>{
    return this.http.get<PositionHiddenType[]>(environment.api + '/hidden')
  }

  createPositionHidden(position:string):Observable<{position:string}>{

    return this.http.post<{position:string}>(environment.api  + '/hidden',{
      position
    })
  }

  deletePositionHidden(id:string):Observable<{id:string}>{
    return this.http.delete<{id: string}>(environment.api + `/hidden/${id}`)
  }

  getPosition(): Observable<PositionsType[]> {
    return this.http.get<PositionsType[]>(environment.api + '/position')

  }

  createPosition(name: string, cost: number, description: string, image: File, category: string): Observable<PositionsType> {
    let fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    fd.append('cost', String(cost))
    fd.append('description', description)
    fd.append('category', category)

    return this.http.post<PositionsType>(environment.api + '/position', fd)
  }

  updatePosition(id:string,name: string, cost: number, description: string, image: File, category: string ): Observable<PositionsType> {
    let fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    fd.append('cost', String(cost))
    fd.append('description', description)
    fd.append('category', category)

    return this.http.patch<PositionsType>(environment.api + `/position/${id}`, fd)
  }

  deletePosition(id: string):Observable<{message:string}>{
    return this.http.delete<{message:string}>(environment.api + `/position/${id}`)

  }

  getByCategoryId(id: string): Observable<PositionsType[]> {
    return this.http.get<PositionsType[]>(environment.api + `/position/${id}`)
  }
}
