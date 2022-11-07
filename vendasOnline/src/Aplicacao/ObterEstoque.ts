import IRepositorioFactory from "../Dominio/Factory/IRepositorioFactory";
import IEstoqueRepositorio from "../Dominio/IRepositorio/IEstoqueRepositorio";
import CalculaEstoque from "../Dominio/Service/CalculaEstoque";

export default class ObterEstoque{

    estoqueRepositorio  : IEstoqueRepositorio;

    constructor(readonly repositorioFactory : IRepositorioFactory){

          this.estoqueRepositorio = repositorioFactory.createEstoqueRepositorio();
    }

    async execute(idItem : number) : Promise<Output>{
        
      const entradasEstoques = await this.estoqueRepositorio.obterEntradasEstoque(idItem);
      const total = CalculaEstoque.calcular(entradasEstoques);

      return {
          total
      };
    
      
    }
}

//DTO
type Output = {
    total : number
}