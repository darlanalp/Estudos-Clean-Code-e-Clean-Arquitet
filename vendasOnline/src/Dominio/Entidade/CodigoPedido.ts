export default class CodigoPedido{

    value : string;
    
    constructor(data:Date, sequencia: number){
       this.value = this.gerarCodigo(data, sequencia);
    }

    private gerarCodigo(data:Date, sequencia: number){
       const year = data.getFullYear();
       return `${year}${(new String(sequencia).padStart(8,"0"))}`;
    }


}