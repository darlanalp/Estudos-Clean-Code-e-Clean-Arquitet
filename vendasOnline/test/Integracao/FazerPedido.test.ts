import { Pedido } from './../../src/Dominio/Entidade/Pedido';
import FazerPedido from "../../src/Aplicacao/FazerPedido"
import CupomRepositorioMemoria from "../../src/Infraestrutura/Repositorio/Memoria/CupomRepositorioMemoria";
import Cupom from "../../src/Dominio/Entidade/Cupom";
import msSqlConexaoAdapter from "../../src/Infraestrutura/DataBase/msSqlConexaoAdapter";
import DataBaseRepositorioFactory from "../../src/Infraestrutura/Factory/DataBaseRepositorioFactory";
import IRepositorioFactory from "../../src/Dominio/Factory/IRepositorioFactory";
import ObterEstoque from "../../src/Aplicacao/ObterEstoque";
import IFila from "../../src/Infraestrutura/Fila/IFila";
import FilaMemoriaAdapter from "../../src/Infraestrutura/Fila/FilaMemoriaAdapter";
import EstoqueHandler from "../../src/Aplicacao/EstoqueHandler";
import PedidoRealizado from '../../src/Dominio/Eventos/PedidoRealizado';
import EstoqueController from '../../src/Infraestrutura/Controller/EstoqueController';


let conexao : msSqlConexaoAdapter;
let repositorioFactory : IRepositorioFactory;
let fila : IFila;

beforeEach(async function(){

    conexao = new msSqlConexaoAdapter();     

    repositorioFactory  = new  DataBaseRepositorioFactory(conexao);    
    const pedidosRepositorio = repositorioFactory.createPedidoRepositorio();
    await pedidosRepositorio.clear();

    const estoqueRepositorio = repositorioFactory.createEstoqueRepositorio();
    estoqueRepositorio.clear(); 
    fila = new FilaMemoriaAdapter();
});


var dataPedido  = new Date("2022-12-10T10:00:00");

test("Deve fazer um pedido", async function () {
    
    //Popula repositorio em memória
  // const repositorioProduto = new ProdutoRepositorioMemoria();
   // repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000));
    //repositorioProduto.save(new Produto(2,"Lápis",2000));
    //repositorioProduto.save(new Produto(3,"Caderno",2000));

    
    //Camada de use case
    const fazerPedido = new FazerPedido(repositorioFactory, fila);

    //DTO
    const pedidoPar = { 
         cpf : "458.950.620-32",
         itens : [
             { idItem : 1, quantidade: 1 },
             { idItem : 2, quantidade: 1 },
             { idItem : 3, quantidade: 1 }
         ]
    };

    
    //O client não conhece o dominio conhece somente a fachada
    const outPut = await fazerPedido.execute(pedidoPar);
    expect(outPut.total).toBe(5000);

});


test("Deve fazer um pedido e gerar um código", async function () {
    
    //Popula repositorio em memória
   // const repositorioProduto = new ProdutoRepositorioMemoria();
   // repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000));
   // repositorioProduto.save(new Produto(2,"Lápis",2000));
   // repositorioProduto.save(new Produto(3,"Caderno",2000));

    //Camada de use case
    const fazerPedido = new FazerPedido(repositorioFactory, fila);

    //DTO
    const pedidoPar = { 
         cpf : "458.950.620-32",
         itens : [
             { idItem : 1, quantidade: 1 },
             { idItem : 2, quantidade: 1 },
             { idItem : 3, quantidade: 1 }
         ],
         data: new Date("2023-03-01T10:00:00")
    };

    
    //O client não conhece o dominio conhece somente a fachada
    const outPut = await fazerPedido.execute(pedidoPar);
    expect(outPut.codigo).toBe("202300000001");

});


test("Deve fazer um pedido com desconto", async function () {
    
    //Popula repositorio em memória
   // const repositorioProduto = new ProdutoRepositorioMemoria();
    //repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000));
    //repositorioProduto.save(new Produto(2,"Lápis",2000));
    //repositorioProduto.save(new Produto(3,"Caderno",2000));

    const cupomRepositorio = new CupomRepositorioMemoria();
    cupomRepositorio.save(new Cupom("VALE10",10));
    
    //Camada de use case
    const fazerPedido = new FazerPedido(repositorioFactory, fila);

    //DTO
    const pedidoPar = { 
         cpf : "458.950.620-32",
         itens : [
             { idItem : 1, quantidade: 1 },
             { idItem : 2, quantidade: 1 },
             { idItem : 3, quantidade: 1 }
         ],
         cupom: "VALE10",
         data: new Date("2019-03-01T10:00:00")
    };

    
    //O client não conhece o dominio conhece somente a fachada
    const outPut = await fazerPedido.execute(pedidoPar);
    expect(outPut.total).toBe(4500);
});


test("Deve fazer um pedido com frete e desconto", async function () {
    
    //var dimenssoes = new Dimenssoes(200, 100, 50, 40); //R$400 para essa dimenssão
    //Popula repositorio em memória
  //  const repositorioProduto = new ProdutoRepositorioMemoria();
   /// repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000, dimenssoes));
  //  repositorioProduto.save(new Produto(2,"Lápis",2000, dimenssoes));
  //  repositorioProduto.save(new Produto(3,"Caderno",2000, dimenssoes));

   // const cupomRepositorio = new CupomRepositorioMemoria();
   // cupomRepositorio.save(new Cupom("VALE10",10));
       
    //Camada de use case
    const fazerPedido = new FazerPedido(repositorioFactory, fila);

    //DTO
    const pedidoPar = { 
         cpf : "458.950.620-32",
         itens : [
             { idItem : 1, quantidade: 1 },
             { idItem : 2, quantidade: 1 },
             { idItem : 3, quantidade: 1 }
         ],
         cupom: "VALE10",
         data: new Date("2018-03-01T10:00:00")
    };

    
    //O client não conhece o dominio conhece somente a fachada
    //+R$ 5000 produtos
    //+R$ 500 desconto (10%)
    const outPut = await fazerPedido.execute(pedidoPar);
    expect(outPut.total).toBe(4500);
        
});

afterEach(async function(){
   await conexao.close();
});

test("Deve fazer um pedido e lançar no estoque", async function () {

    new EstoqueController(fila, repositorioFactory);
    
    //Camada de use case
    const fazerPedido = new FazerPedido(repositorioFactory, fila);

    //DTO
    const pedidoPar = { 
         cpf : "458.950.620-32",
         itens : [
             //{ idItem : 1, quantidade: 1 },
             //{ idItem : 2, quantidade: 1 },
             { idItem : 3, quantidade: 3 }
         ]
    };
    
     await fazerPedido.execute(pedidoPar);

    const obterEstoque = new ObterEstoque(repositorioFactory);
    const output = await obterEstoque.execute(3);
    expect(output.total).toBe(-3);

});
