import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 as uuid4 } from "uuid";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({

});

async function handler(event: APIGatewayProxyEvent, context: Context) {

    const command = new ListBucketsCommand({});

    const ListBucketsResult = (await s3Client.send(command)).Buckets;

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Hello from Lambda, here are your Buckets: ${JSON.stringify(ListBucketsResult)}`)
    };

    console.log(event)

    return response;
}

export { handler }
