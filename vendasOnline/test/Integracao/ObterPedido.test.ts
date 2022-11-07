import FazerPedido from "../../src/Aplicacao/FazerPedido";
import ObterPedido from "../../src/Aplicacao/ObterPedido";
import IRepositorioFactory from "../../src/Dominio/Factory/IRepositorioFactory";
import IPedidoRepositorio from "../../src/Dominio/IRepositorio/IPedidoRepositorio";
import msSqlConexaoAdapter from "../../src/Infraestrutura/DataBase/msSqlConexaoAdapter";
import DataBaseRepositorioFactory from "../../src/Infraestrutura/Factory/DataBaseRepositorioFactory";
import FilaMemoriaAdapter from "../../src/Infraestrutura/Fila/FilaMemoriaAdapter";
import IFila from "../../src/Infraestrutura/Fila/IFila";

let conexao : msSqlConexaoAdapter;
let repositorioFactory : IRepositorioFactory;
let pedidosRepositorio : IPedidoRepositorio;
let fila : IFila;

beforeEach(async function(){
    conexao = new msSqlConexaoAdapter();     
    repositorioFactory  = new  DataBaseRepositorioFactory(conexao);    
    pedidosRepositorio = repositorioFactory.createPedidoRepositorio();
    await pedidosRepositorio.clear();
    fila = new FilaMemoriaAdapter();
});


test("Deve obter um pedido cadastrado", async function () {
    
     //Popula repositorio em memória
   //  const repositorioProduto = new ProdutoRepositorioMemoria();
   //  repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000));
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
          data: new Date("2022-03-01T10:00:00")
     };
 
     
     await fazerPedido.execute(pedidoPar);
     
     const pedidos = new ObterPedido(pedidosRepositorio);
    const output = await pedidos.execute("202200000001");
    expect(output.codigo).toBe("202200000001");
    expect(output.total).toBe(5000);

    await pedidosRepositorio.clear();
});

afterEach(async function(){

    await conexao.close();
});