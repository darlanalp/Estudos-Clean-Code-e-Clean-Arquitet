import IEventosDominio from "../../Dominio/Eventos/IEventosDominio";
import IFila from "./IFila";

export default class FilaMemoriaAdapter implements IFila{

    consumidores : Consumidora[];
    constructor(){
        this.consumidores = [];
    }
    connect(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    close(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async consumir(nomeEvento: string, callback: any): Promise<void> {
        this.consumidores.push({nomeEvento, callback});
    }

    async publicar(eventoDominio: IEventosDominio): Promise<void> {
       for(const consumidor of this.consumidores){
           if(consumidor.nomeEvento == eventoDominio.nome){
               await consumidor.callback(eventoDominio);
           }
       }
    }
}

type Consumidora = {

    nomeEvento : string,
    callback: any
}