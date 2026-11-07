import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NaoEncontrado } from './components/nao-encontrado/nao-encontrado';
import { CadastroAutor } from './components/cadastro-autor/cadastro-autor';
import { CadastroLivro } from './components/cadastro-livro/cadastro-livro';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'autor/cadastro', component:CadastroAutor},
    {path:'autor/:id/editar', component:CadastroAutor},
    {path:'livros/cadastro', component:CadastroLivro},
    {path:'livros/:id/editar', component:CadastroLivro},
    {path:'**', component:NaoEncontrado}
];
