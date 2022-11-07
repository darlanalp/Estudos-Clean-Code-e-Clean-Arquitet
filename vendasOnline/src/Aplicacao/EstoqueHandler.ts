import EntradaEstoque from '../Dominio/Entidade/EntradaEstoque';
import PedidoRealizado from '../Dominio/Eventos/PedidoRealizado';
import IRepositorioFactory from '../Dominio/Factory/IRepositorioFactory';
import IEstoqueRepositorio from '../Dominio/IRepositorio/IEstoqueRepositorio';

//Manipulador
export default class EstoqueHandler{

    estoqueRepositorio : IEstoqueRepositorio;
    constructor(readonly repositorioFactory : IRepositorioFactory){
      this.estoqueRepositorio = repositorioFactory.createEstoqueRepositorio();   
    }

    async handle (pedidoRealizado :PedidoRealizado){
       for(const item of pedidoRealizado.itemsPedido){
           await this.estoqueRepositorio.save(new EntradaEstoque(item.idItem,"out", item.quantidade));           
       }
    }
}