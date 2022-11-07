
import SimularFrete from "../../src/Aplicacao/SimularFrete";
import Dimenssoes from "../../src/Dominio/Entidade/Dimenssoes";
import { Produto } from "../../src/Dominio/Entidade/Produto";
import ProdutoRepositorioMemoria from "../../src/Infraestrutura/Repositorio/Memoria/ProdutoRepositorioMemoria";

test("Deve simular o frete ", async function () {

    var dimenssoes = new Dimenssoes(200, 100, 50, 40);//R$ 400 para essa dimensão

    const repositorioProduto = new ProdutoRepositorioMemoria();
    repositorioProduto.save(new Produto(1,"Caneta Bic Azul",1000, dimenssoes));
    repositorioProduto.save(new Produto(2,"Lápis",2000, dimenssoes));
    repositorioProduto.save(new Produto(3,"Caderno",2000, dimenssoes));

    const simularFrete = new SimularFrete(repositorioProduto);
    
    //DTO
    const fretePar = { 
        cep: "32141-130",
        itensPedido : [
            { idItem : 1, quantidade: 1 },
            { idItem : 2, quantidade: 1 },
            { idItem : 3, quantidade: 1 }
        ]
     };
         
    const outPut = await simularFrete.execute(fretePar);
    expect(outPut.total).toBe(1200);
   
});