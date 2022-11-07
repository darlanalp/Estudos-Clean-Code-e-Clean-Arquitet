import Dimenssoes from "../../src/Dominio/Entidade/Dimenssoes";


test("Deve criar as dimenssões", function () {

    var dimenssoes = new Dimenssoes(100,30, 10, 1);
    const volume = dimenssoes.getVolume()
    expect(volume).toBe(0.03);
});


test("Deve mostrar erro se alguma dimensão for negativa", function () {
    
    expect(()=>new Dimenssoes(-100,30, -10, 1)).toThrow( new Error("Dimenssão negativa"));
});