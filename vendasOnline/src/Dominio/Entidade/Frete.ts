import { ItemPedido } from "./ItemPedido";
import { Produto } from "./Produto";

export default class Frete{
     
    total : number;
    constructor(readonly distancia : number = 1000){      
      this.total = 0;
    }
  
    addItem( produto : Produto, quantidade: number){
      this.total += (this.distancia * produto.getVolume() * (produto.getDensidade()/100) ) * quantidade;
    }

    public getTotal(){
        return (this.total > 0 && this.total < 10) ? 10 : this.total;
    }
}