import IPedidoRepositorio from "../Dominio/IRepositorio/IPedidoRepositorio";
import PedidoRepositorioMemoria from "../Infraestrutura/Repositorio/Memoria/PedidoRepositorioMemoria";

export default class ObterPedidos{

    constructor(readonly pedidoRepositorio : IPedidoRepositorio){
        
    }

    async execute(): Promise<Output[]>{

      const output : Output[] = [];
      const pedidos = await this.pedidoRepositorio.list();
      for(const pedido of pedidos){
          output.push({ codigo: pedido.Codigo.value, total: pedido.total()});
      }

      return output;
    }

}

type Output={
    codigo: string,
    total: number
}