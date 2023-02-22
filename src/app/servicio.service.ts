import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
//Clase que definimos los serivicios de la base de datos
@Injectable({
  providedIn: 'root',
})
export class UsuariosServicesService {
  //Definimos las urls a utilizar
  public baseURL = 'http://localhost:8081/app/api/horarios/';
  public baseURLusuarios = 'http://localhost:8082/app/api/users/';
  constructor(private http: HttpClient) {}
  //Obtiene los usuarios de la base de datos
  getUsuarioBD(): Observable<any> {
    return this.http.get(this.baseURLusuarios);
  }
}
