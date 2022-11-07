import ObterProdutos from "./Aplicacao/ObterProdutos";
import { Pedido } from "./Dominio/Entidade/Pedido";
import { Produto } from "./Dominio/Entidade/Produto";
import msSqlConexaoAdapter from "./Infraestrutura/DataBase/msSqlConexaoAdapter";
import ExpressAdapter from "./Infraestrutura/Http/ExpressAdapter";
import PedidoRepositorioDataBase from "./Infraestrutura/Repositorio/DataBase/PedidoRepositorioDataBase";
import ProdutoRepositorioDataBase from "./Infraestrutura/Repositorio/DataBase/ProdutoRepositorioDataBase";
import ProdutoRepositorioMemoria from "./Infraestrutura/Repositorio/Memoria/ProdutoRepositorioMemoria";

const http = new ExpressAdapter();

http.on("get","/items", async function(params : any, body: any){

    var dataPedido  = new Date("2022-12-10T10:00:00");
    const pedido = new Pedido("458.950.620-32", dataPedido,1);
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);    
        
    const conexao = new msSqlConexaoAdapter();    
    const repositorio = new PedidoRepositorioDataBase(conexao);
    console.log(await repositorio.count());
    //repositorio.save(pedido);
    //console.log("Possui:"+repositorio.count());
    return conexao.query("select * from pedido",[]);

});

http.listen(3000);