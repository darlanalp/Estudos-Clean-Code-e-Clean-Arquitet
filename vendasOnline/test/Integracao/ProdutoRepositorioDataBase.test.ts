import msSqlConexaoAdapter from "../../src/Infraestrutura/DataBase/msSqlConexaoAdapter"
import ProdutoRepositorioDataBase from "../../src/Infraestrutura/Repositorio/DataBase/ProdutoRepositorioDataBase";

test("Deve retornar produto do banco de dados", async function(){
     const conexao = new msSqlConexaoAdapter();
     
     const produtoRepositorio = new ProdutoRepositorioDataBase(conexao);
     const produtos = await produtoRepositorio.list();
     expect(produtos).toHaveLength(3);
})