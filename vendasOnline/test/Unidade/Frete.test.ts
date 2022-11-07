import Dimenssoes from "../../src/Dominio/Entidade/Dimenssoes";
import Frete from "../../src/Dominio/Entidade/Frete";
import { Produto } from "../../src/Dominio/Entidade/Produto";

test("Calcula valor frete com base nas dimenssões teste 1", function () {

    var dimenssoes = new Dimenssoes(20,15, 10, 1);
    var produto = new Produto(1, "HD",1000,dimenssoes);
    var frete = new Frete(1000);    
    frete.addItem(produto, 1);
    expect(frete.getTotal()).toBe(10);
});

test("Calcula valor frete com base nas dimenssões teste 2", function () {

    var dimenssoes = new Dimenssoes(100,30, 10, 3);
    var produto = new Produto(1, "HD",1000,dimenssoes);
    var frete = new Frete(1000);    
    frete.addItem(produto, 1);
    expect(frete.getTotal()).toBe(30);
});

test("Calcula valor frete com base nas dimenssões teste 3", function () {

    var dimenssoes = new Dimenssoes(200, 100, 50, 40);
    var produto = new Produto(1, "HD",1000,dimenssoes);
    var frete = new Frete(1000);    
    frete.addItem(produto, 1);
    expect(frete.getTotal()).toBe(400);
});

test("Deve calcular o frete com preço minimo de 10", function () {

    var dimenssoes = new Dimenssoes(10, 10, 10, 0.9);
    var produto = new Produto(3, "HD",1000,dimenssoes);
    var frete = new Frete(1000);    
    frete.addItem(produto, 1);
    expect(frete.getTotal()).toBe(10);
});