import IProdutoRepositorio from "../Dominio/IRepositorio/IProdutoRepositorio";

export default class ObterProdutos{

    constructor(readonly produtoRepositorio : IProdutoRepositorio){

    }

    async execute() : Promise<Output[]>{
        
      const produtos = await this.produtoRepositorio.list();

      const outPut : Output[] = [];
      for(const produto of produtos){
          outPut.push({
              idIem : produto.idItem,
              descricao: produto.descricao,
              preco: produto.preco
          })
      }

      return outPut;
    }
}

//DTO
type Output = {
    idIem : number,
    descricao : string,
    preco : number
}