export class ItemPedido{

    constructor(readonly idItem: number, readonly preco: number,  readonly quantidade :number){
        if(quantidade < 0)
           throw new Error("Quantidade inválida");
    }

    getValorTotal(){ return this.preco  * this.quantidade}
  
}