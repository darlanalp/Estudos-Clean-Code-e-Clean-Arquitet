import Dimenssoes from "./Dimenssoes";

export class Produto {

    constructor(readonly idItem : number, readonly descricao:string , readonly preco: number, readonly dimenssoes?:Dimenssoes) {
    }

    public getVolume(){
       return this.dimenssoes ? this.dimenssoes.getVolume() : 0;
    }

    public getDensidade(){
        return this.dimenssoes ? this.dimenssoes.getDensidade() : 0;
    }
}
