import IEventosDominio from "../../Dominio/Eventos/IEventosDominio";

export default interface IFila{
    connect(): Promise<void>;
    close(): Promise<void>;
    consumir(nomeEvento: string, callback : any) : Promise<void>;
    publicar(eventoDominio : IEventosDominio) : Promise<void>;
}