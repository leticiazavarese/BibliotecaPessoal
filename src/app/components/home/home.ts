import { RouterLink } from '@angular/router';
import { AutoresService } from '../../Services/autores-service';
import { Component, inject } from '@angular/core';
import { Autor } from '../../models/item.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  autoresService=inject(AutoresService);

  TituloSistema='Biblioteca pessoal de livros';

}
