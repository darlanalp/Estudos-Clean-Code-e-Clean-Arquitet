import { Produto } from './../../../Dominio/Entidade/Produto';
import IProdutoRepositorio from "../../../Dominio/IRepositorio/IProdutoRepositorio";
import IConexao from "../../DataBase/IConexao";

export default class ProdutoRepositorioDataBase implements IProdutoRepositorio {
    
    

    constructor(readonly conexao : IConexao){
      
    }

    async getProduto(idItem : number) : Promise<Produto>{

        const [produtoData] =  await this.conexao.query(`select * from item where id_item = ${idItem}`, []);        
        if(!produtoData)
            throw new Error("Produto não cadastrado");

        //const dimenssao = new Dimenssoes(produtoData.width, produtoData.height, produtoData.length, produtoData.weight);

        return  new Produto(produtoData.id_item, 
                            produtoData.description, 
                            parseFloat(produtoData.price));
    }

   async save(produto : Produto) : Promise<void>{
      throw new Error("Não implementado")
   }

   async list() : Promise<Produto[]>{

       const produtosData = await this.conexao.query("select * from item",[]);
      
       const produtos : Produto[] = [];

       for(const prdData of produtosData){
          produtos.push(new Produto(prdData.id_item, 
                                    prdData.description, 
                                    parseFloat(prdData.price)));
       }
       return produtos;       
   }
   
}