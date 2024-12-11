import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import { firstValueFrom } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NgFor],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  pokemons: any[] = []; // Lista para almacenar todos los Pokémon cargados
  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }
  //Toma la lista de pokemons
  private getPokemonList(): void {
    this.servicioService.getPokemons().subscribe({
      next: async (data) => {
        try {
          // Obtener detalles de cada Pokémon individualmente
          const pokemonRequests = data.results.map((pokemon: any) =>
            firstValueFrom(this.servicioService.getPokemonName(pokemon.nameOrId))
          );

          const pokemonDetails = await Promise.all(pokemonRequests);
          console.log('Detalles de los Pokémon:', pokemonDetails);
        } catch (error) {
          console.error('Error al obtener detalles de los Pokémon', error);
        }
      },
      error: (error) => {
        console.error('Error obteniendo la lista de Pokémon', error);
      },
    });
  }
}
