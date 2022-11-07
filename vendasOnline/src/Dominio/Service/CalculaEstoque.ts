import EntradaEstoque from "../Entidade/EntradaEstoque";

export default class CalculaEstoque {

    static calcular ( entradasEstoque : EntradaEstoque[]){

        return entradasEstoque.reduce((total :  number, entradaEstoque: EntradaEstoque) => {

            if(entradaEstoque.operacao === "in") total += entradaEstoque.quantidade;
            if(entradaEstoque.operacao === "out") total -= entradaEstoque.quantidade;
            
            return total;
        },0);

    }
}