import Cupom from "../Entidade/Cupom";

export default interface ICupomRepositorio{
    get(codigo :string ): Promise<Cupom>;
    save(cupom :Cupom): Promise<void>;
}