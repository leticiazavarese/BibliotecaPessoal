import { computed, Injectable, signal, Service, inject } from '@angular/core';
import { Autor } from '../models/item.model';
import { DbService } from './db-service';

@Service()
export class AutoresService {
  private dbService=inject(DbService)
  private autoresSignal = signal<Autor[]>([]);
  autores = this.autoresSignal.asReadonly();
  
  public totalAutores = computed(() => this.autoresSignal().length);

  constructor(){
    this.dbService.itens.toArray().then(itens=>{
      this.autoresSignal.set(itens);
    })
  }

  addItem(novoItem:Autor){
    return this.dbService.itens.add(novoItem).then(novoId=> {
      novoItem.id=novoId;
      this.autoresSignal.update(itens=>[...itens, novoItem]);
    });
  }

  getItem(id:number){
    return this.dbService.itens.get(id);
  }

  atualizarItem(id:number, nome:string, nacionalidade:string, anodeNascimento:number){
    return this.dbService.itens.update(id,{nome:nome, nacionalidade:nacionalidade, anodeNascimento:anodeNascimento}).then(()=>this.dbService.itens.toArray()).then(itens=>this.autoresSignal.set(itens));
  }
  
  async remover2(id: number) {
        const removida = await this.dbService.transaction(
            'rw',
            this.dbService.itens,
            this.dbService.livros,
            async () => {
                const quantidadeLivros = await this.dbService.livros
                    .where('autorId')
                    .equals(id)
                    .count();

                if (quantidadeLivros > 0) {
                    return false;
                }

                await this.dbService.itens.delete(id);
                return true;
            },
        );

        if (removida) {
            this.autoresSignal.update((autores =>
                autores.filter((autores) => autores.id !== id)
            ));
        }

        return removida
    }

  removerItem(id:number){
    return this.dbService.itens.delete(id).then(()=>{
      this.autoresSignal.update(itens=>itens.filter(item=>item.id!==id))
    })
  }
  
} 
