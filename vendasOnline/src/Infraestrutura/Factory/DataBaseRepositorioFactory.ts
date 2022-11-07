import IRepositorioFactory from "../../Dominio/Factory/IRepositorioFactory";
import ICupomRepositorio from "../../Dominio/IRepositorio/ICupomRepositorio";
import IEstoqueRepositorio from "../../Dominio/IRepositorio/IEstoqueRepositorio";
import IPedidoRepositorio from "../../Dominio/IRepositorio/IPedidoRepositorio";
import IProdutoRepositorio from "../../Dominio/IRepositorio/IProdutoRepositorio";
import IConexao from "../DataBase/IConexao";
import CupomRepositorioDataBae from "../Repositorio/DataBase/CupomRepositorioDataBae";
import EstoqueRepositorioDataBase from "../Repositorio/DataBase/EstoqueRepositorioDataBase";
import PedidoRepositorioDataBase from "../Repositorio/DataBase/PedidoRepositorioDataBase";
import ProdutoRepositorioDataBase from "../Repositorio/DataBase/ProdutoRepositorioDataBase";


export default class DataBaseRepositorioFactory implements IRepositorioFactory{
      
    constructor(readonly conexao : IConexao){

    }

    createProdutoRepositorio() : IProdutoRepositorio{
         return new  ProdutoRepositorioDataBase(this.conexao);
    }

    createPedidoRepositorio() : IPedidoRepositorio{
        return new PedidoRepositorioDataBase(this.conexao);
    }

    createCupomRepositorio() : ICupomRepositorio{
        //Ainda não tenho o DataBase
        return new CupomRepositorioDataBae(this.conexao);
    }

    createEstoqueRepositorio() : IEstoqueRepositorio {

        return new EstoqueRepositorioDataBase(this.conexao)
    }

}