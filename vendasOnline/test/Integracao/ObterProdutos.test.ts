import ObterProdutos from "../../src/Aplicacao/ObterProdutos";
import { Produto } from "../../src/Dominio/Entidade/Produto";
import ProdutoRepositorioMemoria from "../../src/Infraestrutura/Repositorio/Memoria/ProdutoRepositorioMemoria";

test("Deve busca produtos", async function () {

    //Popula repositorio em memória
    const repositorioProduto = new ProdutoRepositorioMemoria();
    repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000));
    repositorioProduto.save(new Produto(2,"Lápis",2000));
    repositorioProduto.save(new Produto(3,"Caderno",2000));

    const obterProduto = new ObterProdutos(repositorioProduto);
    const outPut = await obterProduto.execute();      
     expect(outPut).toHaveLength(3);
});