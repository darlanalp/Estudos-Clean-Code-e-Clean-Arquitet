import IConexao from "../../DataBase/IConexao";
import { Pedido } from "../../../Dominio/Entidade/Pedido";
import IPedidoRepositorio from "../../../Dominio/IRepositorio/IPedidoRepositorio";
import { ItemPedido } from "../../../Dominio/Entidade/ItemPedido";

export default class PedidoRepositorioDataBase implements IPedidoRepositorio {
    
    

    constructor(readonly conexao : IConexao){
      
    }
    
	async save(pedido: Pedido): Promise<void> {

        //TODO: Revisar para passar os parametros de forma dinâmica e formatar a data para gravar HH:MM
        const cupomCod = pedido.Cupom ? pedido.Cupom.codigo : "";
        const cupomPercentual = pedido.Cupom? pedido.Cupom?.percentual : 0;
        
        const comando ="insert into pedido (code, cpf, issue_date, freight, total, sequence, coupon_code, coupon_percentage) values " + 
                      `('${pedido.Codigo.value}', '${pedido.Cpf.cpf}', '${pedido.data.toLocaleDateString('fr-CA')}', '${pedido.frete.getTotal()}', '${pedido.total()}', '${pedido.sequencia}', '${cupomCod}','${cupomPercentual}')`;
       

		 await this.conexao.query(comando, []) ;
        
        
		for (const orderItem of pedido.itemPedido) {
            const comandoItem ="insert into ItemPedido (cod_pedido, id_item, price, 	quantity) values "+
            `(${pedido.Codigo.value}, ${orderItem.idItem}, ${orderItem.preco}, ${orderItem.quantidade})`;
			await this.conexao.query(comandoItem,[]);
                                    
		}
        
        
	}

	async count(): Promise<number> {
		const [row] = await this.conexao.query("select count(*)  from pedido", []);
		return row[""];
	}    

    async get(_code: string) : Promise<Pedido>{

        const [pedidoData] =  await this.conexao.query(`select * from pedido where code = '${_code}'`, []);        
        const pedido = new Pedido(pedidoData.cpf, new Date(pedidoData.issue_date), pedidoData.sequence);

        const itemsPedidoData = await this.conexao.query(`select * from ItemPedido where cod_pedido = '${_code}'`, []);
        pedido.itemPedido = itemsPedidoData.map((item : any) => new ItemPedido(item.id_item, parseFloat(item.price), item.quantity));        
        pedido.frete.total = parseFloat(pedidoData.freight);

        return pedido;
    }

    async list(): Promise<Pedido[]>{

        const pedidos : Pedido[] =[];
        const pedidosData =  await this.conexao.query("select code from pedido order by code", []);

        for(const pedidoData of pedidosData) {
            
            const pedido = await this.get(pedidoData.code);
            pedidos.push(pedido);
        };

        return pedidos;
    }

    async clear() : Promise<void>{      
        await this.conexao.query("delete from ItemPedido",[]); 
        await this.conexao.query("delete from pedido",[]);        
      }
}