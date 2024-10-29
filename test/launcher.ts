import { handler } from "../src/services/spaces/handler";

handler({
    httpMethod: "POST",    
    body: JSON.stringify({
        location: "Dublin!!!"
    })
} as any, {} as any).then((result) => {
    console.log(result);
});
