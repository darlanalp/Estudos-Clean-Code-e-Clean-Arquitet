
import ObterProdutos from "../../Aplicacao/ObterProdutos";
import IProdutoRepositorio from "../../Dominio/IRepositorio/IProdutoRepositorio";
import Http from "../Http/Http";

export default class ItemController {

    constructor(readonly http: Http, readonly repositorio : IProdutoRepositorio){

        http.on("get","/items", async function(params : any, body: any){

            const obterProduto = new ObterProdutos(repositorio);
            return  obterProduto.execute();   
        });

    }
}