import { Produto } from "../Entidade/Produto"

export default interface IProdutoRepositorio{

    getProduto(idItem : number) : Promise<Produto>;
    save(produto : Produto) : Promise<void>;
    list() : Promise<Produto[]>;
}