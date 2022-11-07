import Cupom from "../../../Dominio/Entidade/Cupom";
import ICupomRepositorio from "../../../Dominio/IRepositorio/ICupomRepositorio";

export default class CupomRepositorioMemoria implements ICupomRepositorio {
    
    cupons : Cupom[];

    constructor(){
      this.cupons = [];
    }

    async get(codigo :string ): Promise<Cupom>{

        const cupon = this.cupons.find( c => c.codigo == codigo);
        if(!cupon) throw new Error("Cupon não encontrado");
        return cupon;        
    }

    async save(cupom :Cupom): Promise<void>{
        this.cupons.push(cupom);
    }
}