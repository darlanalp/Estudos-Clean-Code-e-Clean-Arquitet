import IRepositorioFactory from "../../Dominio/Factory/IRepositorioFactory";
import ICupomRepositorio from "../../Dominio/IRepositorio/ICupomRepositorio";
import IPedidoRepositorio from "../../Dominio/IRepositorio/IPedidoRepositorio";
import IProdutoRepositorio from "../../Dominio/IRepositorio/IProdutoRepositorio";
import CupomRepositorioMemoria from "../Repositorio/Memoria/CupomRepositorioMemoria";
import PedidoRepositorioMemoria from "../Repositorio/Memoria/PedidoRepositorioMemoria";
import ProdutoRepositorioMemoria from "../Repositorio/Memoria/ProdutoRepositorioMemoria";

export default class MemoriaRepositorioFactory implements IRepositorioFactory{

    createProdutoRepositorio() : IProdutoRepositorio{
      return new  ProdutoRepositorioMemoria();
    }

    createPedidoRepositorio() : IPedidoRepositorio{
        return new PedidoRepositorioMemoria();
    }

    createCupomRepositorio() : ICupomRepositorio{
        //Ainda não tenho o DataBase
        return new CupomRepositorioMemoria();
    }
    

}