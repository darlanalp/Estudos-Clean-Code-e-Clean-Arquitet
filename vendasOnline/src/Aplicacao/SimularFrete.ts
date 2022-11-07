import Frete from "../Dominio/Entidade/Frete";
import ProdutoRepositorioMemoria from "../Infraestrutura/Repositorio/Memoria/ProdutoRepositorioMemoria";

export default class SimularFrete{

    constructor(readonly produtoRepositorio : ProdutoRepositorioMemoria){

    }

    async execute(input : Input):Promise<Output>{

       const frete = new Frete();//1 distancia fixa so para testar

       for(const itemPedido of input.itensPedido){
          const item = await this.produtoRepositorio.getProduto(itemPedido.idItem);
          frete.addItem(item, itemPedido.quantidade);
       }
       return{
           total: frete.getTotal()
       }
    }

}

type Input ={
  itensPedido : { idItem: number, quantidade: number }[]
}

type Output = {

    total: number
}