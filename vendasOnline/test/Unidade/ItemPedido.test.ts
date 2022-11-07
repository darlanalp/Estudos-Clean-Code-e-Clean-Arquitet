import { ItemPedido } from "../../src/Dominio/Entidade/ItemPedido";

test("Deve lançar um erro se a quantidade for negativa", function () {
        
    expect(() => new ItemPedido(1,1000,-2)).toThrow(new Error("Quantidade inválida"));
});