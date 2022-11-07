import ValidarCupom from "../../src/Aplicacao/ValidarCupom"
import Cupom from "../../src/Dominio/Entidade/Cupom";
import CupomRepositorioMemoria from "../../src/Infraestrutura/Repositorio/Memoria/CupomRepositorioMemoria";

test("Deve validar o cupom de desconto expirado", async function(){

    const cupomRepositorio = new CupomRepositorioMemoria();
    cupomRepositorio.save(new Cupom("VALE20", 20,new Date("2021-03-01T10:00:00")));    
    const validarCupom  = new ValidarCupom(cupomRepositorio);
    const input ={
        codigo : "VALE20",
        data: new Date("2021-03-10T10:00:00")
    }
    const output = await validarCupom.execute(input)
    expect(output.expirado).toBeTruthy();
})

test("Deve validar o cupom de desconto válido", async function(){

    const cupomRepositorio = new CupomRepositorioMemoria();
    cupomRepositorio.save(new Cupom("VALE20", 20,new Date("2021-03-01T10:00:00")));    
    const validarCupom  = new ValidarCupom(cupomRepositorio);
    const input ={
        codigo : "VALE20",
        data: new Date("2021-02-10T10:00:00")
    }
    const output = await validarCupom.execute(input)
    expect(output.expirado).toBeFalsy();
})