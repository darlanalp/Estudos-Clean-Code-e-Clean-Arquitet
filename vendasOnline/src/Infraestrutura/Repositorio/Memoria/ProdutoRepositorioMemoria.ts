import IProdutoRepositorio from "../../../Dominio/IRepositorio/IProdutoRepositorio";
import { Produto } from "../../../Dominio/Entidade/Produto";

export default class ProdutoRepositorioMemoria implements IProdutoRepositorio {
    
    produtos : Produto[];

    constructor(){
      this.produtos = [];
    }

    async getProduto(idItem : number) : Promise<Produto>{

        const produto = this.produtos.find(item => item.idItem == idItem);        
        if(!produto) throw new Error("Produto não encontrado");
        return produto;
    }

   async save(produto : Produto) : Promise<void>{
       this.produtos.push(produto);
   }

   async list() : Promise<Produto[]>{
       return  this.produtos;
   }
   
}