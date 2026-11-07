import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LivrosService } from '../../Services/livros-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Generolivros } from '../../models/genero-livro.model';
import { Livro } from '../../models/livro.model';
import Swal from 'sweetalert2';
import { AutoresService } from '../../Services/autores-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cadastro-livro',
  styleUrl: './cadastro-livro.css',
  templateUrl: './cadastro-livro.html',
})
export class CadastroLivro {
  private livrosService=inject(LivrosService);
  private autoresService=inject(AutoresService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  protected readonly status=Object.values(Generolivros);

  emEdicao = this.route.snapshot.paramMap.has("id");
  itemId = Number(this.route.snapshot.paramMap.get("id"));

  formitem=new FormGroup({
    titulo:new FormControl('', Validators.required),
    genero:new FormControl(Generolivros.ROMANCE, Validators.required),
    anoPublicacao:new FormControl(0, Validators.required),
    autorId:new FormControl(0, Validators.required),
  })
  
  salvar() {
    if (this.formitem.valid) {
      if (this.emEdicao) {
        this.atualizarItem();
      } else {
        this.addItem();
      }
    }
  }

    addItem() {
    if (this.formitem.valid) {
      const novoLivro: Livro = {
        titulo: this.formitem.value.titulo!,
        genero: this.formitem.value.genero!,
        anoPublicacao: this.formitem.value.anoPublicacao!,
        autorId: this.formitem.value.autorId!,
      }; 
      Swal.fire({
                title: "Os seguintes dados estão certos?",
                html: '<strong>Titulo:</strong> ' + novoLivro.titulo + '<br> <strong>genero:</strong> ' + novoLivro.genero + '<br> <strong>Ano publicacao:</strong> ' + novoLivro.anoPublicacao,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.livrosService.addLivro(novoLivro).then(() => {Swal.fire("Cadastrado com sucesso! ", "", "success");});
                }
                else if (result.isDenied) Swal.fire("A desenvolvedora não foi salva", "", "info");
              });
              this.formitem.reset();
              this.router.navigate(['/']);
            };
          }
          atualizarItem() {
              this.livrosService.atualizarItem(
                this.itemId,
                this.formitem.value.titulo!,
                this.formitem.value.anoPublicacao!,

              ).then(() => {
                Swal.fire({ icon: 'success', title: 'Item editado!' });
                this.router.navigate(['/']);
              })
            }
}

