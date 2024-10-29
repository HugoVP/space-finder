import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DeleteItemCommand, DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

async function deleteSpaces(event: APIGatewayProxyEvent, context: Context, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters?.id) {

        const spaceId = event.queryStringParameters.id;

        await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                "id": { S: spaceId }
            },
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(`Deleted space with id ${spaceId}`),
        }
    }    

    return {
        statusCode: 400,
        body: JSON.stringify("Please provide right args!"),
    }
}

export { deleteSpaces }
