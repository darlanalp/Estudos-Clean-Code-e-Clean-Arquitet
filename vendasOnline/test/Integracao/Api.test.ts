import axios from "axios";
//Quem sobe a api é o  npx ts-node src/main.ts 
test.skip("Deve chamar /items",async function(){

    const response  = await axios({
        url:"http://localhost:3000/items",
        method:"get"
    });    

    const items = response.data;
    expect(items).toHaveLength(2)
});