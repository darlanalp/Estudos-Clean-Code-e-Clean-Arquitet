import EntradaEstoque from "../../src/Dominio/Entidade/EntradaEstoque";

test("Deve criar uma entrada no estoqie", () =>{
  const entradaEstoque = new EntradaEstoque(1, "in", 10);
  expect(entradaEstoque.idItem).toBe(1);
  expect(entradaEstoque.operacao).toBe("in");
  expect(entradaEstoque.quantidade).toBe(10);
})