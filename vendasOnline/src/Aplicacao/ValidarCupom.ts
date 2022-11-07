import Cupom from "../Dominio/Entidade/Cupom";
import ICupomRepositorio from "../Dominio/IRepositorio/ICupomRepositorio";


export default class ValidarCupom{

    constructor(readonly cupomRepositorio : ICupomRepositorio){

    }

    async execute(input :Input): Promise<Output> {
       const cupom = await this.cupomRepositorio.get(input.codigo)
       const expirado = cupom.cupomExpirado(input.data, false);

       return{
          expirado
       }
    }
    

}

type  Input ={
    codigo: string,
    data :Date
}

//DTO
type Output = {
    expirado : boolean
}