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
  
} 
