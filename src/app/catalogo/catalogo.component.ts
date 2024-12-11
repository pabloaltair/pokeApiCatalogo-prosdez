import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule], // Usar CommonModule para poder usar NgFor
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  private getPokemonList(): void {
    this.servicioService.getPokemons().subscribe({
      next: (data) => {
        try {
          // Obtener detalles de cada Pokémon individualmente
          const pokemonRequests = data.results.map((pokemon: any) =>
            firstValueFrom(this.servicioService.getPokemonName(pokemon.name))
          );

          Promise.all(pokemonRequests).then((pokemonDetails) => {
            this.pokemonList = pokemonDetails.map((detail: any) => ({
              name: detail.name,
            }));
            console.log('Detalles de los Pokémon:', this.pokemonList);
          });
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
