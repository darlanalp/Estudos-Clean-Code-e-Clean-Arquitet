import EntradaEstoque from "../Entidade/EntradaEstoque";

export default interface IEstoqueRepositorio {

    save(entradaEstoque : EntradaEstoque) : Promise<void>;
    obterEntradasEstoque(idItem : number) :Promise<EntradaEstoque[]>;
    clear(): Promise<void>;
}