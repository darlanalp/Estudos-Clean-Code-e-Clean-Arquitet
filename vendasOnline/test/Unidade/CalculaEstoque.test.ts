import EntradaEstoque from "../../src/Dominio/Entidade/EntradaEstoque";
import CalculaEstoque from "../../src/Dominio/Service/CalculaEstoque";

test("Desve calcular a quantidade de itens em estoque", () =>{

    const entradasEstoque =[
        new EntradaEstoque(1,"in",10),
        new EntradaEstoque(1,"in",10),
        new EntradaEstoque(1,"out",5),
        new EntradaEstoque(1,"out",5)
    ];

    const total = CalculaEstoque.calcular(entradasEstoque)
    expect(total).toBe(10);
});