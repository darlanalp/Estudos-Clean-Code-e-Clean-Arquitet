import IConexao from "./IConexao";

export default class msSqlConexaoAdapter implements IConexao{
    
    sql : any;
    config : string;

    constructor(){
        this.sql = require('mssql');
        this.config = 'Server=localhost,1433;Database=VendaOnline;User Id=rm;Password=rm;Trusted_Connection=True;TrustServerCertificate=True;';
    }
    
	async query(consulta: string, [])  : Promise<any> {
	
        await this.sql.connect(this.config)
        const result = await this.sql.query(consulta);
       // this.sql.close();
        return result.recordset;
        //result.recordset
        //result.rowsAffected
        //result.recordset[0]
        

        //https://www.npmjs.com/package/mssql#connection-pools
        //sql.close();''
        /**
         *     const pool = await poolPromise''
    const result = await pool.request()
        .input('input_parameter', sql.Int, req.query.input_parameter)
        .query('select * from mytable where id = @input_parameter') 
         */
	}

    async close(): Promise<void>{     
        await this.sql.close();
    }
   
}

   
