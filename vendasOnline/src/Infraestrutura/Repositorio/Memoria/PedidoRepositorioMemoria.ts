import IPedidoRepositorio from "../../../Dominio/IRepositorio/IPedidoRepositorio";
import { Pedido } from "../../../Dominio/Entidade/Pedido";

export default class PedidoRepositorioMemoria implements IPedidoRepositorio {
    
    pedidos : Pedido[];

    constructor(){
      this.pedidos = [];
    }

    async save( pedido : Pedido) : Promise<void>{
        this.pedidos.push(pedido);
    }

    async count(): Promise<number>{
      return this.pedidos.length;
    }

    async get (codigo: string):  Promise<Pedido>{

         throw new Error("Método não implementado");
    }

    async list() : Promise<Pedido[]> {
     return this.pedidos;
    }

    async clear() : Promise<void>{      
      throw new Error("Método não implementado");
    }

}