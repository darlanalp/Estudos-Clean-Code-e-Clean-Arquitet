import { ItemPedido } from './../Entidade/ItemPedido';
import IEventosDominio from "./IEventosDominio";

export default class PedidoRealizado implements IEventosDominio{
    nome = "Pedido";
    constructor(readonly codigo : string, readonly itemsPedido : ItemPedido[]){
        
    }
}