import IPedidoRepositorio from "../Dominio/IRepositorio/IPedidoRepositorio";
import PedidoRepositorioMemoria from "../Infraestrutura/Repositorio/Memoria/PedidoRepositorioMemoria";

export default class ObterPedido{

    constructor(readonly pedidoRepositorio : IPedidoRepositorio){
        
    }

    async execute(codigo : string): Promise<Output>{      
      const pedido = await this.pedidoRepositorio.get(codigo);
      
      return {
          codigo: pedido.Codigo.value,
          total: pedido.total()
      }
    }
}

type Output={
    codigo: string,
    total: number
}