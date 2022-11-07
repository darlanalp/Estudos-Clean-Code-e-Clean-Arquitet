
import { Cpf } from "../../src/Dominio/Entidade/Cpf";

test("CPF válido", function () {
    const _cpf = new Cpf("381.044.210-00");
    expect(_cpf.valida()).toBeTruthy(); // toBeTruthy => true
});

test("CPF inválido com todos os números iguais", function () {
    const _cpf = new Cpf("111.111.111-11");
    expect(_cpf.valida()).toBeFalsy(); // toBeTruthy => true
});


test("CPF formato incorreto", function () {
    const _cpf = new Cpf("111111");
    expect(_cpf.valida()).toBeFalsy(); //toBeFalsy =>
});


test("CPF formato correto, porém inválido", function () {
    const _cpf = new Cpf("381.044.210-11");
    expect(_cpf.valida()).toBe(false);
});
test("CPF não informado - undefined", function () {
    const _cpf = new Cpf("undefined");
    expect(_cpf.valida()).toBe(false);
});

test("CPF sem mascara - inválido", function () {
    const _cpf = new Cpf("38104421001");    
    expect(_cpf.valida()).toBe(false);
});

test('CPF não informado', () => {

    expect(() => {
        const _cpf = new Cpf("");    
        _cpf.valida()        
      }).toThrow('Cpf não informado');
    
});

test("CPF erro conversao", function () {
    const _cpf = new Cpf("381.xv4.210-00");
    expect(_cpf.valida()).toBe(false);
});
