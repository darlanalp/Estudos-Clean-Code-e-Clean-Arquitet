import { Pedido } from "../Entidade/Pedido";

export default interface IPedidoRepositorio{

    save( pedido : Pedido) : Promise<void>;
    count(): Promise<number>;
    list() : Promise<Pedido[]>;
    get(codigo :string) : Promise<Pedido>;
    clear() : Promise<void>;
}