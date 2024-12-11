import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  //Creamos una variable(string) que contenga el enlace de la api
  private baseUrl: string = 'https://pokeapi.co/api/v2';
  //Creamos una variable http a la cual le damos el valor de la funcion HttpClient para hacer la conexion con la API
  constructor(private http: HttpClient) { }

  //Funcion que toma todos los pokemons de la Api
  getPokemons():Observable<any>{
    //Devuelve los pokemons
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=100000&offset=0`);
  }
  //Funcion que toma nombre del pokemon
  getPokemonName(nameOrId: string):Observable<any>{
    //Devuelve nombre pokemon
    return this.http.get<any>(`${this.baseUrl}/pokemon/${nameOrId}`);

  }
}
