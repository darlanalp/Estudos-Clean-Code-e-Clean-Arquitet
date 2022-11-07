import ObterEstoque from "../../src/Aplicacao/ObterEstoque";
import EntradaEstoque from "../../src/Dominio/Entidade/EntradaEstoque";
import msSqlConexaoAdapter from "../../src/Infraestrutura/DataBase/msSqlConexaoAdapter";
import DataBaseRepositorioFactory from "../../src/Infraestrutura/Factory/DataBaseRepositorioFactory"

test("Deve retornar o estoque de um determinado item",  async () =>{

    const conexao = new msSqlConexaoAdapter();     
    const repositorioFactory  = new  DataBaseRepositorioFactory(conexao);    

    const estoqueRepositorio = repositorioFactory.createEstoqueRepositorio();
    await estoqueRepositorio.clear();
    await estoqueRepositorio.save(new EntradaEstoque(1,"in",10))
    await estoqueRepositorio.save(new EntradaEstoque(1,"in",10))
    await estoqueRepositorio.save(new EntradaEstoque(1,"out",5))
    await estoqueRepositorio.save(new EntradaEstoque(1,"out",5))

    const obterEstoque = new ObterEstoque(repositorioFactory);
    const output = await obterEstoque.execute(1);
    expect(output.total).toBe(10);

    conexao.close();

})