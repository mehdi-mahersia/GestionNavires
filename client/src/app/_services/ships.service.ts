import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Ship } from '../_models/ship';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getShips() {
    return this.http.get<Ship[]>(this.baseUrl + 'ships');
  }

  getShip(id: any) {
    return this.http.get<Ship>(this.baseUrl + 'ships/' + id);
  }

  updateShip(model: any, shipId: any) {
    if(shipId == -1) {
      console.log('Add');
      return this.http.post<Ship>(this.baseUrl + 'ships/add', model).pipe(
        map(ship => {
          
        })
      );
    } else {
      console.log('Edit');
      return this.http.post<Ship>(this.baseUrl + 'ships/edit', model, shipId).pipe(
        map(ship => {
          
        })
      );
    }
  }

  deleteShip(id: any) {
    return this.http.delete<boolean>(this.baseUrl + 'ships/' + id);
  }


}
