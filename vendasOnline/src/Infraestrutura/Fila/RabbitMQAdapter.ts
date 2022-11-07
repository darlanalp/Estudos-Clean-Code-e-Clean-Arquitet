import IEventosDominio from "../../Dominio/Eventos/IEventosDominio";
import IFila from "./IFila";
import amqp from "amqplib"

export default  class RabbitMQAdapter implements IFila{

    connecion: amqp.Connection | undefined;

    async connect(): Promise<void> {
        this.connecion = await amqp.connect("amqp:localhost");
    }

    async close(): Promise<void> {        
        if(!this.connecion) throw Error();
        await this.connecion.close();
    }

    async consumir(nomeEvento: string, callback: any): Promise<void> {

      if(!this.connecion) throw Error();
      const channel = await  this.connecion.createChannel();
      await channel.assertQueue(nomeEvento,{durable : true});
      await channel.consume(nomeEvento, async function (msg: any) {
          await callback(JSON.parse(msg.content.toString()));
      }, {noAck : true});
    }

    async publicar(eventoDominio: IEventosDominio): Promise<void> {

      if(!this.connecion) throw Error();
      const channel = await  this.connecion.createChannel();
      await channel.assertQueue(eventoDominio.nome,{durable : true});
      channel.sendToQueue(eventoDominio.nome, Buffer.from(JSON.stringify(eventoDominio)))
      
    }

}