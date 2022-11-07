import Cupom from "../../../Dominio/Entidade/Cupom";
import ICupomRepositorio from "../../../Dominio/IRepositorio/ICupomRepositorio";
import IConexao from "../../DataBase/IConexao";

export default class CupomRepositorioDataBae implements ICupomRepositorio {

    constructor(readonly conexao : IConexao){
      
    }
    async get(codigo :string ): Promise<Cupom>{

        const [cupomData] =  await this.conexao.query(`select * from coupon where code = '${codigo}'`, []);        
        if(!cupomData)
            throw new Error("Cupon não encontrado");

        return new Cupom(cupomData.code, parseFloat(cupomData.percentage));

    }

    async save(cupom :Cupom): Promise<void>{
        //this.cupons.push(cupom);
    }
}