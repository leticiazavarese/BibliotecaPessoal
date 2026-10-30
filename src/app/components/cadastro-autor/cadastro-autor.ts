import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoresService } from '../../Services/autores-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../models/item.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cadastro-autor',
  styleUrl: './cadastro-autor.css',
  templateUrl: './cadastro-autor.html',
})
export class CadastroAutor {
  private autorService=inject(AutoresService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  emEdicao=this.route.snapshot.paramMap.has("id");
  itemId=Number(this.route.snapshot.paramMap.get("id"));

  formItem=new FormGroup({
    nome:new FormControl('', Validators.required),
    nacionalidade:new FormControl('', Validators.required),
    anodeNascimento:new FormControl(0, Validators.required),
  })

  addItem(){
    if (this.formItem.valid){
      const novoItem: Autor={
        nome:this.formItem.value.nome!,
        nacionalidade:this.formItem.value.nacionalidade!,
        anodeNascimento:this.formItem.value.anodeNascimento!,
      
      };

      this.autorService.addItem(novoItem)
      
    }
  }
  salvar() {
    if (this.formItem.valid) {
      if (this.emEdicao) {
        this.atualizarItem();
      } else {
        this.addItem();
      }
    }
  }
  atualizarItem() {
    this.autorService.atualizarItem(
      this.itemId,
      this.formItem.value.nome!,
      this.formItem.value.nacionalidade!,
      this.formItem.value.anodeNascimento!,
    )
  }

  
  
}
