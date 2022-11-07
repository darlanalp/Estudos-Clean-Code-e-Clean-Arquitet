export default interface IConexao {

    query(consulta: string, params: any ): Promise<any>;
    close(): Promise<void>;

}