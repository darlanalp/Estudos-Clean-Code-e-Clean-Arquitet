export default class Cupom{

    cuponsValidos = {
        "VALE10": 10,
        "VALE20": 20,
        "VALE30": 30,
    };

    constructor(readonly codigo : string, readonly percentual : number, readonly dataExpiracao? : Date ){ 
        this.cupomValido();   
    }

    public cupomExpirado(dataAtual : Date, mostraErro: boolean = true){        

        var expirado = false;
        if(this.dataExpiracao)
        {   
          expirado = dataAtual.getTime()  >  this.dataExpiracao.getTime();      
          if( expirado)
          {
            if(mostraErro)
               throw new Error('cupom de desconto expirado');    
          }
        }
        return expirado;
    }
    
    public cupomValido(){
     
        if (!this.cuponsValidos.hasOwnProperty(this.codigo)) {
            throw new Error('cupom de desconto inválido');    
        }        
    }

    public calcuculaDesconto( total : number){
        return (total * this.percentual) /100;
    }
}