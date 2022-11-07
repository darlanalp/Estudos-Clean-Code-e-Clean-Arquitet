import Cupom from "../../src/Dominio/Entidade/Cupom";
import { Pedido } from "../../src/Dominio/Entidade/Pedido";
import { Produto } from "../../src/Dominio/Entidade/Produto";

var dataPedido  = new Date("2022-12-10T10:00:00");

test("Cria pedido com 3 itens", function () {
    
    const pedido = new Pedido("458.950.620-32", dataPedido);
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);
    pedido.addItem(new Produto(2,"Lápis",2000), 2);
    pedido.addItem(new Produto(3,"Caderno",2000), 1);
    
    expect(pedido.totalComDesconto()).toBe(10000);
});

test("Cria pedido com cpf inválido", function () {    
    expect(() => { new Pedido("458.950.620-31", dataPedido) ; }).toThrow('Cpf inválido');
});

test("Cria pedido com 3 itens e um cupom de desconto", function () {
    
    const pedido = new Pedido("458.950.620-32", dataPedido);
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);
    pedido.addItem(new Produto(2,"Lápis",2000), 2);
    pedido.addItem(new Produto(3,"Caderno",2000), 1);
    pedido.addCupom( new Cupom("VALE20",10))    
    expect(pedido.total()).toBe(10000);
    expect(pedido.totalComDesconto()).toBe(9000);
});

test("Cria pedido com cupon inválido", function () {
    
    const pedido = new Pedido("458.950.620-32", dataPedido);
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);    
        
    expect(() => {
        pedido.addCupom( new Cupom("VALE40",10, new Date("2022-12-10T10:00:00")))    
    }).toThrow('cupom de desconto inválido');

});

test("Cria pedido com cupon expirado", function () {
    
    const pedido = new Pedido("458.950.620-32", new Date("2022-05-04T10:00:00"));
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);    
        
    expect(() => {
        pedido.addCupom( new Cupom("VALE20",10, new Date("2021-03-10T10:00:00")))    
    }).toThrow('cupom de desconto expirado');

});

test("Deve lançar erro se o item for adicionado mais de uma vez", function () {
    
    const pedido = new Pedido("458.950.620-32");
    pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4);
    expect(() =>  pedido.addItem(new Produto(1,"Caneta Bic Azul",1000), 4)).toThrow(new Error("Produto já adicionado"));
});


