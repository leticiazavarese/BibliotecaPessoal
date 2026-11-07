import { Service } from '@angular/core';
import Dexie, {Table} from 'dexie';
import { Autor } from '../models/item.model';
import { Livro} from '../models/livro.model';

@Service()
export class DbService extends Dexie{
  itens!: Table<Autor,number>;
  livros!: Table<Livro, number>;

  constructor(){
    super('CatalogoItensDB');
    this.version(1).stores({
      itens:'++id, nome, nacionalidade, anodeNascimento',
      livros:'++id, titulo, genero, anoPublicacao, autorId'
    })
  }
}
