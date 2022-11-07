import CodigoPedido from "../../src/Dominio/Entidade/CodigoPedido";

test("Deve gerar o código do pedido", function () {
    
    const codigoPedido = new CodigoPedido(new Date("2021-03-01T10:00:00"),1);
    expect(codigoPedido.value).toBe("202100000001");
    
});