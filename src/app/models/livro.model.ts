import { Generolivros } from "./genero-livro.model";

export interface Livro{
    id?:number;
    titulo:String;
    genero:Generolivros;
    anoPublicacao:number;
    autorId:number;
}