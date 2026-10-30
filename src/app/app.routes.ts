import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NaoEncontrado } from './components/nao-encontrado/nao-encontrado';
import { CadastroAutor } from './components/cadastro-autor/cadastro-autor';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'autor/cadastro', component:CadastroAutor},
    {path:'**', component:NaoEncontrado}
];
