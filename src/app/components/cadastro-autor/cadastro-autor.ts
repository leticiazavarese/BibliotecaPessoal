import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoresService } from '../../Services/autores-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../models/item.model';
import Swal from 'sweetalert2';

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

  constructor(){
    if(this.emEdicao){
      this.autorService.getItem(this.itemId).then(item=>{
        if(item){
          this.formItem.patchValue(item);}
          else{
            Swal.fire({icon:'error', title:'item não existe'});
            this.router.navigate(['/']);
          }
      })
    }
  }

  addItem(){
    if (this.formItem.valid){
      const novoItem: Autor={
        nome:this.formItem.value.nome!,
        nacionalidade:this.formItem.value.nacionalidade!,
        anodeNascimento:this.formItem.value.anodeNascimento!,
      
      };
      Swal.fire({
          title: "Os seguintes dados estão certos?",
          html: '<strong>Nome:</strong> ' + novoItem.nome + '<br> <strong>Nacionalidade:</strong> ' + novoItem.nacionalidade + '<br> <strong>Ano nascimento:</strong> ' + novoItem.anodeNascimento,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não salvar`
        }).then((result) => {
          if (result.isConfirmed) {
            this.autorService.addItem(novoItem).then(() => {Swal.fire("Cadastrado com sucesso! ", "", "success");});
          }
          else if (result.isDenied) Swal.fire("O autor não foi salvo", "", "info");
        });
        this.formItem.reset();
        this.router.navigate(['/']);
      };
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
    ).then(() => {
      Swal.fire({ icon: 'success', title: 'Item editado!' });
      this.router.navigate(['/']);
    })
  }

  
  
}
