
import { Produto } from "./Produto";
import { ItemPedido } from "./ItemPedido";
import { Cpf } from "./Cpf";
import Frete from "./Frete";
import Cupom from "./Cupom";
import CodigoPedido from "./CodigoPedido";


//Order
export class Pedido{

    Cpf : Cpf;
    Cupom? : Cupom;
    itemPedido : ItemPedido[];    
    frete : Frete;
    Codigo : CodigoPedido;
    sequencia : number
    
    constructor(_Cpf : string, readonly data : Date = new Date(), sequencia: number = 1){
                
        this.Cpf = new Cpf(_Cpf) ;
        this.validaCpf();        
        this.itemPedido = [];
        this.frete = new Frete(1000); //Distância fixa 1000
        this.Codigo = new CodigoPedido(data, sequencia);
        this.sequencia = sequencia;

    }

    validaCpf(){        
        if(! this.Cpf.valida())
          throw new Error('Cpf inválido');            
    }

    validaProdutoDuplicado(produto : Produto){
        if(this.itemPedido.some(item => item.idItem == produto.idItem))
           throw new Error("Produto já adicionado");
    }

    addItem( produto : Produto, quantidade: number){

        this.validaProdutoDuplicado(produto);

        this.itemPedido.push(new ItemPedido(produto.idItem, produto.preco, quantidade));
        this.frete.addItem(produto, quantidade);
    }

    getTotaFrete(){
        return this.frete.getTotal();
    }

    addCupom( cupom : Cupom){
     cupom.cupomExpirado(this.data)
     this.Cupom = cupom;
    }

    private totalItens(){
        let total = 0;
        this.itemPedido.forEach( item => {total += item.getValorTotal();})
        return total;        
    }

    total(){
        return this.totalItens() + this.frete.getTotal();
    }

    desconto(){
        if(this.Cupom)
           return  this.Cupom.calcuculaDesconto(this.totalItens());
        return 0;
    }

    totalComDesconto(){
       return this.total() - this.desconto();           
    }
}
