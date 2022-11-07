export default class Dimenssoes{
    validaDimensoesNegativa(){
        if(this.altura < 0 || this.largura < 0 || this.profundidade < 0)
           throw new Error("Dimenssão negativa");
    }

    constructor(readonly altura: number, readonly largura: number, readonly profundidade: number, readonly peso : number ){
        this.validaDimensoesNegativa();
    }
    
    public getVolume(){
        // a divisão por 100 é para converter de cm para metros cubicos
        return (this.altura/100) * (this.largura/100) * (this.profundidade/100);
    }

    public getDensidade(){
        return this.peso / this.getVolume();
    }
}