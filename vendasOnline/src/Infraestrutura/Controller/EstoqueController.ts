import EstoqueHandler from "../../Aplicacao/EstoqueHandler";
import PedidoRealizado from "../../Dominio/Eventos/PedidoRealizado";
import IRepositorioFactory from "../../Dominio/Factory/IRepositorioFactory";
import IFila from "../Fila/IFila";

export default class EstoqueController{

    constructor(readonly fila :IFila, readonly repositorioFactory : IRepositorioFactory){

        fila.consumir("Pedido", async function (pedidoRealizado :PedidoRealizado) {
            
            const estoqueHandler = new EstoqueHandler(repositorioFactory);
            await estoqueHandler.handle(pedidoRealizado);
        })

    }
}