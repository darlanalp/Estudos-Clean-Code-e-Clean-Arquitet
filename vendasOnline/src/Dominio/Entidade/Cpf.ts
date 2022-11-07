//code small
//Refatoração
//Técnicas para refatoração
//1 - nomes estranhos
//2 - linhas em branco
//3 - comentário (apagar comentários)
//4 - remover codições aninhadas 
//5 - uso inadequado de controle de exception (remove o try cath inadequado)
//6 - identação errada
//7 - método grandes (reescrever método)
export class Cpf {

    cpf : string;
    constructor(cpf : string){

        if(cpf === "" || cpf == null)
           throw new Error('Cpf não informado');        
        this.cpf = this.removeCaracteresMascara(cpf);
    }

    private tamanhoValido(){
        return this.cpf.length >= 11 && this.cpf.length <= 14;
    }

    private removeCaracteresMascara(cpf : string) : string{
        return cpf.replace(/\D/g,""); //cpf.replace('.', '').replace('.', '').replace('-', '').replace(" ", "");
    }
    
    private digitoVerificadorInformado(){
     return  this.cpf.substring(this.cpf.length - 2, this.cpf.length)
    }
    
    private calculaDigito(){
        let d1 = 0;
            let d2 = 0;            
            let digito;
            let nDigResult;
            for (let nCount = 1; nCount < this.cpf.length - 1; nCount++) {    
                digito = parseInt(this.cpf.substring(nCount - 1, nCount));
                d1 = d1 + (11 - nCount) * digito;
                d2 = d2 + (12 - nCount) * digito;
            };
            let rest = (d1 % 11);
            let dg1 = (rest < 2) ?  0 : 11 - rest;
            d2 += 2 * dg1;
            rest = (d2 % 11);

            let dg2 = (rest < 2) ? 0 : 11 - rest;
            return "" + dg1 + "" + dg2;    
    }

    private numerosIdenticos(){        
        return this.cpf.split("").every(c => c === this.cpf[0])
    }

    valida() {     
        if(!this.tamanhoValido())
            return false;            
        if (!this.numerosIdenticos()) {                                   
            return this.digitoVerificadorInformado() == this.calculaDigito();            
        }        
        return false;
    }    
}