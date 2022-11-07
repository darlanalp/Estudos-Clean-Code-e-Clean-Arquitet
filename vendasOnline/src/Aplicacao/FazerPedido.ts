import IPedidoRepositorio from "../Dominio/IRepositorio/IPedidoRepositorio";
import IProdutoRepositorio from "../Dominio/IRepositorio/IProdutoRepositorio";
import { Pedido } from "../Dominio/Entidade/Pedido";
import ICupomRepositorio from "../Dominio/IRepositorio/ICupomRepositorio";
import IRepositorioFactory from "../Dominio/Factory/IRepositorioFactory";
import IEstoqueRepositorio from "../Dominio/IRepositorio/IEstoqueRepositorio";
import EntradaEstoque from "../Dominio/Entidade/EntradaEstoque";
import PedidoRealizado from "../Dominio/Eventos/PedidoRealizado";
import IFila from "../Infraestrutura/Fila/IFila";

export default class FazerPedido{

    produtoRepositorio: IProdutoRepositorio; 
    pedidoRepositorio : IPedidoRepositorio;
    cupomRepositorio : ICupomRepositorio;
    estoqueRepositorio : IEstoqueRepositorio;

    constructor(readonly repositorioFactory : IRepositorioFactory, readonly fila : IFila){

         this.produtoRepositorio = repositorioFactory.createProdutoRepositorio(); 
         this.pedidoRepositorio  = repositorioFactory.createPedidoRepositorio();
         this.cupomRepositorio = repositorioFactory.createCupomRepositorio();
         this.estoqueRepositorio = repositorioFactory.createEstoqueRepositorio();
    }

    async execute(input : pedidoPar) : Promise<outPut>{
       const sequecia = await this.pedidoRepositorio.count() + 1;
       const pedido = new Pedido(input.cpf, input.data, sequecia);
       for (const itensPedido of input.itens){

           const item = await this.produtoRepositorio.getProduto(itensPedido.idItem);
           pedido.addItem(item, itensPedido.quantidade);
       }

       if(input.cupom){
           const cupom = await this.cupomRepositorio.get(input.cupom);
           pedido.addCupom(cupom);
       }

       const total  = pedido.totalComDesconto() ;
       const codigo = pedido.Codigo.value;

       await this.pedidoRepositorio.save(pedido);

       const pedidoRealizado = new PedidoRealizado(pedido.Codigo.value, pedido.itemPedido);
       await this.fila.publicar(pedidoRealizado);


       return { codigo, total };
    }
}

//DTO
type pedidoPar = {
    cpf : string;
    itens :{ idItem: number, quantidade : number}  [],
    cupom?: string,
    data? : Date
}


//DTO
type outPut = {
    codigo :string;
    total : number;
}