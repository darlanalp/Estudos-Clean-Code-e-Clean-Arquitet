import EntradaEstoque from '../../../Dominio/Entidade/EntradaEstoque';
import IEstoqueRepositorio from '../../../Dominio/IRepositorio/IEstoqueRepositorio';
import IConexao from "../../DataBase/IConexao";

export default class EstoqueRepositorioDataBase implements IEstoqueRepositorio {
    
    

    constructor(readonly conexao : IConexao){
      
    }

    async save(entradaEstoque : EntradaEstoque) : Promise<void>{
        
        const comando = "insert into stock_entry (id_item, operation, quantity)  values " + 
                        `('${entradaEstoque.idItem}', '${entradaEstoque.operacao}', '${entradaEstoque.quantidade}')`;

        await this.conexao.query(comando, []) ;

    }
    async obterEntradasEstoque(idItem : number) :Promise<EntradaEstoque[]>{
        const entradasEstoqueData =  await this.conexao.query(`select * from stock_entry where id_item = ${idItem}`, []);        

        const entradasEstoque = [];

        for (const entradaEstoqueData of entradasEstoqueData) {
            const entradaEstoque = new EntradaEstoque(entradaEstoqueData.id_item, entradaEstoqueData.operation, entradaEstoqueData.quantity);
            entradasEstoque.push(entradaEstoque);
        }
        return entradasEstoque;
            }

    async clear(): Promise<void>{
        await this.conexao.query("delete from stock_entry",[]); 
    }



   
}