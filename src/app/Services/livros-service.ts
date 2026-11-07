import { computed, inject, Service, signal } from '@angular/core';
import { Livro } from '../models/livro.model';
import { DbService } from './db-service';

@Service()
export class LivrosService {

    private dbService=inject(DbService);
    private livrosSignal=signal<Livro[]>([]);
    livros=this.livrosSignal.asReadonly();
    public totalLivros=computed(()=>this.livrosSignal().length);

    addLivro(novoLivro:Livro){
        return this.dbService.livros.add(novoLivro).then(novoId=>{
            novoLivro.id=novoId;
            this.livrosSignal.update(itens=>[...itens, novoLivro]);
        });
    }

    atualizarItem(id:number, titulo:string, anoPublicacao:number){
        return this.dbService.itens.update(id,{nome:titulo,}).then(()=>this.dbService.livros.toArray()).then(livros=>this.livrosSignal.set(livros));
    }
}
