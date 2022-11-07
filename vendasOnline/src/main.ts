import ObterProdutos from "./Aplicacao/ObterProdutos";
import { Produto } from "./Dominio/Entidade/Produto";
import ItemController from "./Infraestrutura/Controller/PedidoController";
import msSqlConexaoAdapter from "./Infraestrutura/DataBase/msSqlConexaoAdapter";
import ExpressAdapter from "./Infraestrutura/Http/ExpressAdapter";
import ProdutoRepositorioDataBase from "./Infraestrutura/Repositorio/DataBase/ProdutoRepositorioDataBase";

const http = new ExpressAdapter();
const conexao = new msSqlConexaoAdapter();
const repositorioProduto = new ProdutoRepositorioDataBase(conexao);
new ItemController(http, repositorioProduto);

http.listen(3000);