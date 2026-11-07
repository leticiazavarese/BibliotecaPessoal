import { RouterLink } from '@angular/router';
import { AutoresService } from '../../Services/autores-service';
import { Component, inject } from '@angular/core';
import { Autor } from '../../models/item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  autoresService=inject(AutoresService);

  TituloSistema='Biblioteca pessoal de livros';

  async remover(item:Autor){
    const resultadoDelete =   await this.autoresService.remover2(item.id!)
    
    if (resultadoDelete) {
      Swal.fire({ 
        icon:"success",
        title: 'Autor '+item.nome+' removido com sucesso!<br>' 
      })
    }
    else {
       Swal.fire({ 
        icon:"warning",
        title: 'Erro ao remover autor '+item.nome+'<br>' ,
        text:' essa ação nao pode ser realizada',
      })
    }
    
  }

}
