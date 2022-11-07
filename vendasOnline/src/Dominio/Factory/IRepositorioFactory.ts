import ICupomRepositorio from "../IRepositorio/ICupomRepositorio";
import IEstoqueRepositorio from "../IRepositorio/IEstoqueRepositorio";
import IPedidoRepositorio from "../IRepositorio/IPedidoRepositorio";
import IProdutoRepositorio from "../IRepositorio/IProdutoRepositorio";

export default interface IRepositorioFactory{

    createProdutoRepositorio() : IProdutoRepositorio;
    createPedidoRepositorio() : IPedidoRepositorio;
    createCupomRepositorio() : ICupomRepositorio;    
    createEstoqueRepositorio() : IEstoqueRepositorio;

}